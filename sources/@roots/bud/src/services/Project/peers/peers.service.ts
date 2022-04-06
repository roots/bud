/* eslint-disable simple-import-sort/imports */
import * as Framework from '@roots/bud-framework'
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
export class Peers
  extends Framework.Service
  implements Framework.Peers.Service
{
  public adjacents: AdjacencyList

  public modules: Record<string, Dependency> = {}

  public peerDependencies: Map<string, string> = new Map()

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolveModulePath(name: string) {
    try {
      const result = await pkgUp.pkgUp({cwd: dirname(safeResolve(name))})

      return dirname(result)
    } catch (err) {
      this.app.warn(`${name} manifest cannot be resolved`)
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
      this.app.warn({
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
      this.modules['root'] = {
        ...(this.app.context?.manifest ?? {}),
        name: 'root',
        version: this.app.context.manifest?.version ?? '0.0.0',
        bud: this.app.context.manifest?.bud ?? null,
        resolvable: this.app.context?.manifest ? true : false,
        requires: Object.entries<string>({
          ...(this.app.context.manifest?.devDependencies ?? {}),
          ...(this.app.context.manifest?.dependencies ?? {}),
        }),
      }

      await Promise.all(
        this.modules['root'].requires
          .filter(([name]) => !name?.startsWith('@types'))
          .map(async ([name]) => {
            await this.collect(name)
          }),
      )

      this.adjacents = new AdjacencyList(this.modules)
    } catch (e) {
      this.app.error(e)
    }

    return this
  }

  @bind
  public async retrieveManifest(name: string) {
    const search = await this.resolveModulePath(name)
    if (!search) return false

    return await this.getManifest(search)
  }

  @bind
  public async collect(name: string) {
    const manifest = await this.retrieveManifest(name)

    const dependency: Dependency = {
      name: manifest?.name ?? name,
      version: manifest?.version ?? '0.0.0',
      bud: manifest?.bud ?? null,
      resolvable:
        manifest && (manifest.main || manifest.module || manifest.exports)
          ? true
          : false,
      peerDependencies: manifest?.peerDependencies ?? {},
      requires: Object.entries<string>({
        ...manifest?.bud?.peers?.reduce(
          (a: Record<string, any>, k: string) => ({
            ...a,
            [k]: manifest?.version,
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
