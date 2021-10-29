import {
  bind,
  globby,
  Peers,
  Project as FrameworkProject,
  readJson,
} from './project.dependencies'
import type {Repository} from './project.interface'

/**
 * Project service class
 *
 * @public
 */
export class Project
  extends FrameworkProject.Abstract
  implements FrameworkProject.Interface
{
  /**
   * Project package.json location
   *
   * @public
   */
  public manifestPath: string

  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  /**
   * Project repository
   *
   * @public
   */
  public repository: Repository = {
    version: null,
    cache: {
      file: null,
      directory: null,
    },
    configs: {
      dynamic: {
        global: {},
        conditional: {},
      },
      json: {
        global: {},
        conditional: {},
      },
    },
    manifestPath: null,
    manifest: {},
    installed: [],
    peers: {},
    extensions: {},
    resolve: [],
    dependencies: [],
  }

  @bind
  public async register(): Promise<void> {
    this.set(
      'manifestPath',
      this.app.path('project', 'package.json'),
    )
    this.set('dependencies', [this.get('manifestPath')])

    try {
      const manifest = await readJson(this.get('manifestPath'))
      this.set('manifest', manifest)

      this.getEntries('manifest').forEach(([k, v]) => {
        this.app.info(`project manifest ${k} set as`, typeof v)
      })
    } catch (e) {
      this.app.error('manifest file not found', e)
    }

    this.set('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })

    this.has('manifest.bud.locations.cache') &&
      this.app
        .setPath({
          storage: this.get('manifest.bud.locations.cache'),
        })
        .info(
          `project cache directory set as`,
          this.app.path('storage'),
        )

    this.mergeStore({
      cache: {
        directory: this.app.path('storage'),
        file: this.app.path(
          'storage',
          `/${this.app.name}.profile.json`,
        ),
      },
    })

    await Promise.all(
      [
        {
          key: 'configs.dynamic.global',
          searchString: `${this.app.name}.config.{js,ts}`,
        },
        {
          key: `configs.dynamic.conditional`,
          searchString: `${this.app.name}.${this.app.mode}.config.{js,ts}`,
        },
        {
          key: 'configs.json.global',
          searchString: `${this.app.name}.config.{json,yml}`,
        },
        {
          key: 'configs.json.conditional',
          searchString: `${this.app.name}.${this.app.mode}.config.{json,yml}`,
        },
      ].map(this.setConfig),
    )
  }

  @bind
  public async boot() {
    await this.resolvePeers()
  }

  @bind
  public async setConfig({key, searchString}) {
    const paths = await globby.globby(
      this.app.path('project', searchString),
    )

    const configs = await Promise.all(
      paths.map(async path => {
        try {
          const module = await import(path)
          return {path, module}
        } catch (e) {
          this.app.error(`could not import `, e)
        }
      }),
    )

    if (!configs.length) return
    const dependencies = this.get('dependencies') ?? []
    Object.entries(configs).forEach(([_k, {path}]) => {
      this.set('dependencies', [...dependencies, path])
    })

    this.set(key, configs)
    this.app.success(
      `imported config`,
      ...configs.map(({path}) => path),
    )
  }

  /**
   * Returns all gathered project data
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }

  /**
   * Read project package.json and set peer deps
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolvePeers() {
    this.peers = new Peers(this.app)

    if (this.has('manifest.dependencies')) {
      await this.peers.discover('dependencies')
    }

    if (this.has('manifest.devDependencies')) {
      await this.peers.discover('devDependencies')
    }
  }

  /**
   * Returns true if a dependency is listed in the project manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasPeerDependency(pkg: string): boolean {
    return this.has(`peers.${pkg}`)
  }
}
