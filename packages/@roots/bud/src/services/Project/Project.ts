import * as Framework from '@roots/bud-framework'
import {ensureFile} from 'fs-extra'

import {Config} from './config'
import {
  bind,
  Peers,
  readJson,
  remove,
  writeFile,
} from './project.dependencies'
import {repository} from './project.repository'

/**
 * Project service class
 *
 * @public
 */
export class Project extends Framework.Project.Abstract {
  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  public repository = repository

  public async register() {
    this.peers = new Peers(this.app)

    this.setStore({
      ...repository,
      cli: this.app.store.get('cli'),
      env: {
        public: this.app.env.getPublicEnv(),
        all: this.app.env.all(),
      },
      manifestPath: this.app.path('project', 'package.json'),
      dependencies: [this.app.path('project', 'package.json')],
    })

    try {
      const manifest = await readJson(this.get('manifestPath'))
      this.set('manifest', manifest)
    } catch (e) {
      this.log('error', 'manifest file not found', e)
    }

    this.app
      .when(
        this.has(`manifest.${this.app.name}.inject`),
        ({store}) =>
          store.set(
            'inject',
            this.get(`manifest.${this.app.name}.inject`),
          ),
      )
      .when(this.has(`manifest.${this.app.name}.paths`), () =>
        this.app.store.merge(
          'location',
          this.get(`manifest.${this.app.name}.paths`),
        ),
      )

    this.set('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })

    this.log(
      'info',
      `inject feature is ${
        this.app.store.is(`inject`, true)
          ? `enabled`
          : `disabled`
      }`,
    )
      .log(
        'info',
        `project directory set as`,
        this.app.store.get('location.project'),
      )
      .log(
        'info',
        `project src directory set as`,
        this.app.store.get('location.src'),
      )
      .log(
        'info',
        `project dist directory set as`,
        this.app.store.get('location.dist'),
      )
      .log(
        'info',
        `project cache directory set as`,
        this.app.store.get('location.storage'),
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
  }

  @bind
  public async registered(): Promise<void> {
    if (this.app.store.is('cache', false)) {
      this.log('warn', 'caching disabled. flushing.')
      await this.clearCaches()
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

    await this.resolvePeers()
  }

  @bind
  public async booted() {
    await this.writeProfile()
  }

  @bind
  public async clearCaches() {
    this.log(
      'warn',
      'Removing storage',
      this.app.path('storage'),
    )
    await remove(this.app.path('storage'))
    await ensureFile(this.get('cache.file'))
  }

  @bind
  public async writeProfile() {
    await ensureFile(this.get('cache.file'))
    await writeFile(
      this.get('cache.file'),
      JSON.stringify(this.all()),
    )

    this.log(
      'success',
      `project profile saved to disk`,
      this.get('cache.file'),
    )
  }

  @bind
  public async searchConfig({key, searchStrings}) {
    const explorer = new Config(this.app, searchStrings)

    if (this.app.store.is('cache', false)) {
      this.log('warn', `clearing ${key} config cache`)
      explorer.clearCaches()
    }

    const result = await explorer.search()

    this.set(key, result)

    if (result === null) return

    const dependencies = this.get('dependencies') ?? []
    this.set('dependencies', [...dependencies, result.filepath])
    this.log('success', `imported config`, result.filepath)
  }

  /**
   * Read project package.json and set peer deps
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolvePeers() {
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
