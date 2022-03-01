import * as Framework from '@roots/bud-framework'
import {bind, fs, globby, jsonStringify} from '@roots/bud-support'

import {Peers} from './peers'
import {writeFile} from './project.dependencies'
import {repository} from './project.repository'

const {ensureFile, readJson} = fs

/**
 * Project service
 *
 * @public
 */
export class Project
  extends Framework.Service
  implements Framework.Project
{
  /**
   * Service ident
   *
   * @internal
   */
  public ident = 'project'

  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  /**
   * Repository values
   *
   * @public
   */
  public repository: repository = repository

  /**
   * Path to profile.json reference file
   *
   * @public
   */
  public get profilePath(): string {
    return this.app.path('storage', this.app.name, 'profile.json')
  }

  /**
   * Service bootstrap event
   *
   * @internal
   * @decorator `@bind`
   */
  public async bootstrap() {
    this.peers = new Peers(this.app)

    await this.loadManifest()

    const setLocale = key =>
      this.app.store.set(
        `location.${key}`,
        this.get(`manifest.${this.app.name}.location.${key}`) ??
          this.app.options.config.location[key],
      )

    ;['project', 'src', 'dist', 'storage', 'modules'].map(setLocale)
  }

  /**
   * Service register event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.set('env', {
      public: this.app.env.getPublicEnv(),
      all: this.app.env.all(),
    })
    this.set('dependencies', [this.app.path('project', 'package.json')])

    try {
      await this.buildProfile()
    } catch (e) {
      this.log('error', e)
    }

    if (this.app.store.is('features.install', true)) {
      if (this.isEmpty('unmet')) return
      await this.app.dependencies.install(this.get('unmet'))
      await this.loadManifest()
    }
  }

  /**
   * Service boot event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    this.app.hooks.action('event.build.after', async () => {
      await this.app.hooks.fire('event.project.write')
      await this.writeProfile()
    })
  }

  /**
   * Read project package.json and record peer dependencies
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolvePeers() {
    await this.peers.discover()
    this.set('modules', this.peers.modules)
    this.set('adjacents', this.peers.adjacents.fromRoot('root'))
  }

  /**
   * Read manifest from disk
   *
   * @public
   */
  @bind
  public async loadManifest(): Promise<void> {
    const manifest = await readJson(
      this.app.path('project', 'package.json'),
    )

    this.set('manifest', manifest)

    this.merge('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })
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

  /**
   * @public
   */
  @bind
  public async buildProfile() {
    await ensureFile(this.profilePath)
    this.log('time', 'building profile')

    try {
      await this.loadManifest()
      await this.resolvePeers()
      await this.searchConfigs()
    } catch (e) {
      this.log('error', {
        message: 'building profile',
        suffix: e,
      })
    }

    this.log('timeEnd', 'building profile')
  }

  /**
   * @public
   */
  @bind
  public async writeProfile() {
    await ensureFile(this.profilePath)

    await writeFile(
      this.profilePath,
      jsonStringify(this.repository, null, 2),
    )

    this.log('success', {
      message: 'write profile',
      suffix: this.profilePath,
    })
  }

  @bind
  public async readProfile() {
    await ensureFile(this.profilePath)

    this.log('await', {
      message: 'read profile',
      suffix: this.profilePath,
    })

    try {
      const res = await readJson(this.profilePath)

      this.log('success', {
        message: 'read profile',
        suffix: this.profilePath,
      })

      return res
    } catch (e) {
      this.log('error', {
        message: 'read profile',
        suffix: this.profilePath,
      })
    }
  }

  @bind
  public async searchConfigs() {
    this.log('await', 'reading project configuration files')

    const configs = [
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
    ]

    const findConfig = async function ({key, searchStrings}) {
      const search = await globby.globby(searchStrings, {
        cwd: this.app.path('project'),
      })

      if (!search || !search?.length) return

      await Promise.all(
        search.map(async result => {
          this.log('note', {
            message: 'located user config',
            suffix: result,
          })

          if (!result || !result.length) return

          this.merge('dependencies', [this.app.path('project', result)])

          if (!result.endsWith('json') && !result.endsWith('yml')) {
            return this.merge(key, [this.app.path('project', result)])
          }

          if (result.endsWith('.json')) {
            const json = await this.app.json.read(
              this.app.path('project', result),
            )
            this.app.dump(json)
            return this.merge(key, json)
          }

          if (result.endsWith('.yml')) {
            return this.mutate(key, i =>
              Array.from(
                new Set([
                  ...i,
                  this.app.yml.read(this.app.path('project', result)),
                ]),
              ),
            )
          }
        }),
      )
    }

    await Promise.all(configs.map(findConfig.bind(this)))

    this.app.dump(this.get('configs'), {
      prefix: 'project config results',
    })
  }
}
