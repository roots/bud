import {Framework, Service} from '@roots/bud-framework'
import {dirname, join} from 'path'

import {CORE_MODULES} from './peers.constants'
import {
  bind,
  pkgUp,
  readJson,
  safeResolve,
} from './peers.dependencies'
import type {Peers as Model} from './peers.interface'

/**
 * Peers service class
 *
 * @public
 */
export class Peers implements Model.Interface {
  /**
   * Log helper
   *
   * @public
   */
  public log: Service['log']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Framework) {
    this.log = this.app.project.log
  }

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getPackageManifestPath(name: string) {
    try {
      const packagePath = await pkgUp.default({
        cwd: dirname(safeResolve(name)),
      })

      return dirname(packagePath)
    } catch (err) {
      this.log('error', `${name} manifest cannot be resolved`)
      return
    }
  }

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getManifest(name: string) {
    try {
      const manifestPath = await this.getPackageManifestPath(
        name,
      )

      if (!manifestPath) {
        this.log('error', {
          message: `manifest could not be resolved`,
          suffix: name,
        })
        return null
      }
      const manifest = await readJson(
        join(manifestPath, '/package.json'),
      )
      this.log('success', {
        message: `manifest resolved`,
        suffix: name,
      })

      return manifest
    } catch (err) {
      this.log('error', {
        message: `manifest could not be resolved`,
        suffix: name,
      })
    }
  }

  /**
   * Returns true if a module is a bud
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public isExtension(name: string): boolean {
    return (
      (name.includes('@roots') || name.includes('bud-')) &&
      !CORE_MODULES.includes(name)
    )
  }

  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async discover(
    projectModuleType: 'dependencies' | 'devDependencies',
  ) {
    this.log('await', `analyzing ${projectModuleType}`)

    const dependencies = this.app.project
      .getKeys(`manifest.${projectModuleType}`)
      .filter((name: string) => {
        if (
          !this.isExtension(name) ||
          this.app.project.has(`extensions.${name}`)
        ) {
          return false
        }

        return true
      })

    await Promise.all(
      dependencies.map(
        async (name: string) =>
          await this.profileExtension(name),
      ),
    )

    return this
  }

  /**
   * Profile extension
   *
   * @remarks
   * Given a manifest, will separate peers
   * and extensions for further processing.
   *
   * If an extension requires another extension, it will call
   * itself recursively until it reaches bottom.
   *
   * If two extensions require one another it will not iterate
   * infinitely as it checks if an extension exists before
   * recursing.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async profileExtension(name: string) {
    const path = await this.getPackageManifestPath(name)
    if (this.app.project.get(`resolve`).includes(path)) return

    /**
     * Add path to app.project resolutions array
     */
    this.app.project.mutate(
      'resolve',
      (paths: Array<string>) => [...paths, path],
    )
    this.log('success', {
      message: `resolving ${name}`,
      suffix: path,
    })

    /**
     * Get the extension manifest
     * and add to app.project extensions object
     */
    const manifest = await this.getManifest(name)
    this.app.project.set(`extensions.${name}`, {
      name: manifest.name,
      version: manifest.version,
      peerDependencies: manifest.peerDependencies,
      devDependencies: manifest.devDependencies,
      dependencies: manifest.dependencies,
      bud: manifest.bud,
      path,
    })

    /**
     * If extension has dependencies, recurse and profile them
     */
    if (manifest.peerDependencies) {
      await Promise.all(
        Object.entries(manifest.peerDependencies).map(
          async ([peerName, peerVersion]: [string, string]) => {
            /**
             * If peer dependency is already profiled, skip
             */
            if (this.app.project.has(`peers.${peerName}`))
              return false

            this.app.project.set(`peers.${peerName}`, {
              name: peerName,
              version: peerVersion,
            })

            /**
             * Flag unmmet dependencies
             */
            if (!this.app.project.get(`installed.${peerName}`)) {
              this.app.project.mutate(`unmet`, unmet => [
                ...unmet,
                {name: peerName, version: peerVersion},
              ])

              this.log('error', {
                message: `required peer dependency is unmet`,
                suffix: `${peerName}@${peerVersion}`,
              })

              return
            }

            this.log('success', {
              message: `required peer dependency is met`,
              suffix: `${peerName}@${peerVersion}`,
            })
          },
        ),
      )
    }

    if (this.app.project.has(`extensions.${name}.bud.peers`)) {
      await Promise.all(
        this.app.project
          .get(`extensions.${name}.bud.peers`)
          .map(async (name: string) => {
            if (
              !this.isExtension(name) ||
              this.app.project.has(`extensions.${name}`)
            ) {
              return
            }

            await this.profileExtension(name)
            return
          }),
      )
    }

    return
  }
}
