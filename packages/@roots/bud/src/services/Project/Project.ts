import {Config} from './config'
import {
  bind,
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
        global: [],
        conditional: [],
      },
      json: {
        global: [],
        conditional: [],
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

    this.get(`manifest.${this.app.name}.locations.cache`) &&
      this.app
        .setPath({
          storage: this.get(
            `manifest.${this.app.name}.locations.cache`,
          ),
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
          `${this.app.name}.profile.json`,
        ),
      },
    })

    await Promise.all(
      [
        {
          key: 'configs.dynamic.global',
          searchStrings: [
            `${this.app.name}.config.ts`,
            `${this.app.name}.config.js`,
          ],
        },
        {
          key: `configs.dynamic.conditional`,
          searchStrings: [
            `${this.app.name}.${this.app.mode}.config.ts`,
            `${this.app.name}.${this.app.mode}.config.js`,
          ],
        },
        {
          key: 'configs.json.global',
          searchStrings: [
            `${this.app.name}.config.json`,
            `${this.app.name}.config.yml`,
          ],
        },
        {
          key: 'configs.json.conditional',
          searchStrings: [
            `${this.app.name}.${this.app.mode}.config.json`,
            `${this.app.name}.${this.app.mode}.config.yml`,
          ],
        },
      ].map(this.searchConfig),
    )
  }

  @bind
  public async boot() {
    await this.resolvePeers()
  }

  @bind
  public async searchConfig({key, searchStrings}) {
    const explorer = new Config(this.app, searchStrings)
    const result = await explorer.search()

    this.set(key, result)

    if (result === null) return

    const dependencies = this.get('dependencies') ?? []
    this.set('dependencies', [...dependencies, result.filepath])
    this.app.success(`imported config`, result.filepath)
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
