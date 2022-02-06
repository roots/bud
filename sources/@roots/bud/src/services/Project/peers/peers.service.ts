/* eslint-disable simple-import-sort/imports */
import {
  Framework,
  Peers as PeersInterface,
  Service,
} from '@roots/bud-framework'
import {bind, fs, pkgUp, safeResolve} from '@roots/bud-support'
import {posix} from 'path'
import {Dependency} from './peers.interface'

const {readJson} = fs
const {dirname, join} = posix

/**
 * Peers service class
 *
 * @public
 */
export class Peers implements PeersInterface {
  /**
   * Log helper
   *
   * @public
   */
  public get log(): Service['log'] {
    return this.app.project.log
  }

  public modules: Record<string, Dependency> = {}

  public peerDependencies: Map<string, string> = new Map()

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
      const result = await pkgUp({
        cwd: dirname(safeResolve(name)),
      })

      return dirname(result)
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
  public async getManifest(directoryPath: string) {
    try {
      return await readJson(join(directoryPath, '/package.json'))
    } catch (err) {
      this.log('error', {
        message: `manifest could not be resolved`,
        suffix: directoryPath,
      })
    }
  }

  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async discover() {
    try {
      const manifest = await this.getManifest(this.app.path('project'))
      this.modules['root'] = {
        name: 'root',
        bud: manifest.bud ?? null,
        requires: Object.entries<string>({
          ...(manifest.devDependencies ?? {}),
          ...(manifest.dependencies ?? {}),
        }),
      }

      await Promise.all(
        this.modules['root'].requires
          .filter(([name]) => !name.startsWith('@types'))
          .map(async ([name]) => {
            await this.collect(name)
          }),
      )
    } catch (e) {
      this.app.error(e)
    }

    return this
  }

  @bind
  public async retrieveManifest(name: string) {
    const searchDir = await this.resolveModulePath(name)
    if (!searchDir) return false

    return await this.getManifest(searchDir)
  }

  @bind
  public async collect(name: string) {
    const manifest = await this.retrieveManifest(name)

    const dependency: Dependency = {
      name: manifest.name ?? name,
      bud: manifest.bud ?? null,
      peerDependencies: manifest.peerDependencies ?? {},
      requires: Object.entries<string>({
        ...manifest.bud?.peers?.reduce(
          (a: Record<string, any>, k: string) => ({
            ...a,
            [k]: manifest.version,
          }),
          {},
        ),
      }),
    }

    if (dependency.bud?.type !== 'extension') return

    this.modules[name] = dependency

    if (dependency.peerDependencies) {
      Object.entries(dependency.peerDependencies).forEach(
        ([name, version]) => this.peerDependencies.set(name, version),
      )
    }

    if (dependency.requires) {
      await Promise.all(
        Array.from(dependency.requires)
          .filter(([key]) => !key.startsWith('@types/'))
          .map(async ([key]) => {
            await this.collect(key)
          }),
      )
    }
  }
}
