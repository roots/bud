import {dirname, join} from 'path'

import {CORE_MODULES} from './peers.constants'
import {
  bind,
  pkgUp,
  readJsonSync,
  safeResolve,
} from './peers.dependencies'
import type {Peers as Model, Project} from './peers.interface'

/**
 * Peers service class
 *
 * @public
 */
export class Peers implements Model.Interface {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public project: Project.Interface) {
    this.project.has('manifest.dependencies') &&
      this.discover('dependencies')

    this.project.has('manifest.devDependencies') &&
      this.discover('devDependencies')
  }

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public resolvePeerByName(name: string) {
    try {
      const dir = dirname(
        pkgUp.sync({
          cwd: dirname(safeResolve(name)),
        }),
      )

      return dir
    } catch (err) {
      return null
    }
  }

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getPeerManifest(name: string) {
    const path = this.resolvePeerByName(name)
    return path ? readJsonSync(join(path, '/package.json')) : {}
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
  public discover(
    projectModuleType: 'dependencies' | 'devDependencies',
  ): this {
    this.project.logger.log(`Analyzing ${projectModuleType}`)

    this.project
      .getKeys(`manifest.${projectModuleType}`)
      .filter((name: string) => {
        if (!this.isExtension(name)) {
          this.project.app.log(
            `${name} is not an extension. Skipping.`,
          )
          return false
        }

        if (this.project.has(`extensions.${name}`)) {
          this.project.app.log(
            `${name} already included. Skipping.`,
          )
          return false
        }

        return true
      })
      .map((name: string) => {
        this.project.app.log(`Profiling ${name}`)
        return this.profileExtension(name)
      })

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
  public profileExtension(name: string) {
    const path = this.resolvePeerByName(name)

    if (
      this.project.get('resolve').includes(path) ||
      this.project.has(`extensions.${name}`)
    ) {
      return
    }
    this.project.app.log(`Profiling ${name}`)

    const resolve = this.project.get('resolve')
    this.project.set('resolve', [...resolve, path])
    this.project.app.log(`Resolving modules from ${path}`)

    const manifest = this.getPeerManifest(name)

    const extension = {
      name: manifest.name,
      bud: manifest.bud,
      path: path,
      dependsOn: manifest.peerDependencies,
      provides: manifest.dependencies,
      version: manifest.version,
    }

    this.project.set(`extensions.${name}`, extension)

    extension.dependsOn &&
      Object.entries(extension.dependsOn)
        .filter(([name, version]) => {
          if (this.project.has(`peers.${name}`)) {
            return false
          }
          this.project.app.log(
            `New peer dependency found: ${name}@${version}`,
          )

          return true
        })
        .forEach(([name, version]) => {
          this.project.set(`peers.${name}`, {name, version})
        })

    extension.bud.peers?.forEach(name => {
      if (
        !this.isExtension(name) ||
        this.project.has(`extensions.${name}`)
      ) {
        return
      }

      this.profileExtension(name)
    })
  }
}
