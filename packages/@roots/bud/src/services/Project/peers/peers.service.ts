/* eslint-disable simple-import-sort/imports */
import {
  Framework,
  Peers as PeersInterface,
  Service,
} from '@roots/bud-framework'
import {bind, fs, pkgUp, safeResolve} from '@roots/bud-support'
import {posix} from 'path'
import {AdjacencyList} from './adjacencyList'
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

  public adjacents: AdjacencyList

  public modules: Record<string, Dependency> = {}

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
      await this.collect('root', true)

      this.adjacents = new AdjacencyList(this.modules)
    } catch (e) {
      this.app.error(e)
      throw new Error(e)
    }

    return this
  }

  @bind
  public async retrieveManifest(name: string, path?: string) {
    const searchDir =
      path ?? name == 'root'
        ? process.cwd()
        : await this.resolveModulePath(name)

    return await this.getManifest(searchDir)
  }

  @bind
  public async collect(name: string, includeAll = false) {
    const manifest = await this.retrieveManifest(name)
    if (name === 'root') manifest.name = 'root'
    const dependency = this.makeDependency(manifest, includeAll)
    this.modules[name] = dependency

    if (
      !dependency.bud &&
      name !== 'root' &&
      !name.includes('@roots')
    )
      return

    await Promise.all(
      Array.from(dependency.requires)
        .filter(([key]) => !key.startsWith('@types/'))
        .map(async ([key, version]) => {
          this.app.log(name, key)
          await this.collect(key)
        }),
    )
  }

  @bind
  public makeDependency(
    manifest: Dependency,
    includeAll = false,
  ): Dependency {
    return {
      name: manifest.name,
      version: manifest.version ?? '0.0.0',
      bud: manifest.bud ?? null,
      requires: new Set<[string, string]>(
        Object.entries({
          ...(includeAll === true && manifest.devDependencies
            ? manifest.devDependencies
            : {}),
          ...(includeAll === true && manifest.dependencies
            ? manifest.dependencies
            : {}),
          ...(manifest.peerDependencies ?? {}),
          ...(manifest.bud?.peers?.reduce(
            (a, peer) => ({
              ...a,
              [peer]: manifest.version,
            }),
            {},
          ) ?? {}),
        }),
      ),
    }
  }
}
