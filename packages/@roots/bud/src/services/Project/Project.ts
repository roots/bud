import {ensureFile} from 'fs-extra'

import {Config} from './config'
import {
  bind,
  Peers,
  Project as FrameworkProject,
  readJson,
  remove,
  writeFile,
} from './project.dependencies'
import type {Repository} from './project.interface'
import {repository} from './project.repository'

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
  public repository: Repository = repository

  public async bootstrap() {
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

    this.has(`manifest.${this.app.name}.project.inject`) &&
      this.app.store.set(
        'inject',
        this.get(`manifest.${this.app.name}.project.inject`),
      )

    this.has(`manifest.${this.app.name}.project.cache`) &&
      this.app.store.set(
        'cache',
        this.get(`manifest.${this.app.name}.project.cache`),
      )

    this.has(`manifest.${this.app.name}.project.cache`) &&
      this.app
        .setPath({
          storage: this.get(
            `manifest.${this.app.name}.project.cache`,
          ),
        })
        .info(
          `project cache directory set as`,
          this.app.path('storage'),
        )

    this.has(`manifest.${this.app.name}.project.storagePath`) &&
      this.app
        .setPath({
          storage: this.get(
            `manifest.${this.app.name}.project.storagePath`,
          ),
        })
        .info(
          `project storage directory set as`,
          this.app.path('storage'),
        )
  }

  @bind
  public async register(): Promise<void> {
    this.set('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })

    this.mergeStore({
      cache: {
        directory: this.app.path('storage'),
        file: this.app.path(
          'storage',
          `${this.app.name}.profile.json`,
        ),
      },
    })

    if (this.app.store.is('cache', false)) {
      this.app.warn('Removing storage', this.app.path('storage'))
      await remove(this.app.path('storage'))
    }

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
    await ensureFile(
      this.app.path('storage', 'bud.profile.json'),
    )
    await writeFile(
      this.app.path('storage', 'bud.profile.json'),
      JSON.stringify(this.all()),
    )
  }

  @bind
  public async searchConfig({key, searchStrings}) {
    const explorer = new Config(this.app, searchStrings)
    if (this.app.store.is('cache', false)) {
      this.app.warn(`clearing ${key} config cache`)
      explorer.clearCaches()
    }

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
