import {Framework, Service} from '@roots/bud-framework'
import {
  bind,
  fs,
  lodash,
  pkgUp,
  safeResolve,
} from '@roots/bud-support'
import {posix} from 'path'

import type {Peers as Model} from './peers.interface'

const {isString, isUndefined} = lodash
const {readJson} = fs
const {dirname, join} = posix

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
  public get log(): Service['log'] {
    return this.app.project.log
  }

  public profiled = []

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Framework) {}

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolveModulePath(name: string) {
    try {
      this.log('info', {
        message: `resolving ${name} manifest path`,
      })

      const result = await pkgUp({
        cwd: dirname(safeResolve(name)),
      })
      const packagePath = dirname(result)

      this.log('success', {
        message: `resolved ${name}`,
        suffix: packagePath,
      })

      return packagePath
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
  public async getManifest(manifestPath: string) {
    try {
      if (!manifestPath) {
        this.log('error', {
          message: `manifest could not be resolved`,
          suffix: manifestPath,
        })

        return null
      }

      const manifest = await readJson(
        join(manifestPath, '/package.json'),
      )

      this.log('success', {
        message: `manifest resolved`,
        suffix: manifestPath,
      })

      return manifest
    } catch (err) {
      this.log('error', {
        message: `manifest could not be resolved`,
        suffix: manifestPath,
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
  public isExtension(manifest: Record<string, any>): boolean {
    return manifest?.bud?.type === 'extension'
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

    const packages = this.app.project.getKeys(
      `manifest.${projectModuleType}`,
    )

    this.log('info', {
      message: `found ${packages.length} packages`,
      suffix: projectModuleType,
    })

    const eligible = packages.filter((name: string) => {
      return (
        !isUndefined(name) &&
        isString(name) &&
        !name.includes('@types') &&
        !this.profiled.includes(name)
      )
    })

    this.log('info', {
      message: `found ${eligible.length} potentially unprofiled extensions`,
      suffix: projectModuleType,
    })

    await Promise.all(eligible.map(this.profileExtension))

    return this
  }

  /**
   * Profile extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async profileExtension(name: string) {
    if (this.profiled.includes(name)) {
      this.log('info', `${name} is already profiled. skipping`)
      return
    }

    this.profiled.push(name)

    this.log('info', {
      message: `profiling ${name}`,
      suffix: `${this.profiled.length} packages profiled`,
    })

    const path = await this.resolveModulePath(name)
    const manifest = await this.getManifest(path)
    const records = {
      path,
      ...manifest,
      missingExtensions: [],
      missingPeers: [],
    }

    if (isUndefined(records?.bud)) {
      this.log('info', `${name} is not an extension`)
      return
    }

    this.app.project.set(`extensions.${name}`, records)

    await this.profileDependencies(records)
  }

  /**
   * Profile extended dependencies
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
  public async profileDependencies(
    manifest: Record<string, any>,
  ) {
    this.log('info', {
      message: `profiling dependencies`,
      suffix: manifest.name,
    })

    if (manifest.bud?.peers?.length) {
      await Promise.all(
        manifest.bud.peers.map(async (peer: string) => {
          try {
            await import(peer)
          } catch {
            this.app.project.merge(
              `extensions.${manifest.name}.missingExtensions`,
              [peer],
            )
            return
          }

          await this.profileExtension(peer)
        }),
      )
    }

    if (manifest.peerDependencies) {
      await Promise.all(
        Object.entries(manifest.peerDependencies).map(
          async ([peerName, peerVersion]: [string, string]) => {
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
              this.app.project.merge(
                `extensions.${manifest.name}.missingPeers`,
                [{name: peerName, version: peerVersion}],
              )

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
  }
}
