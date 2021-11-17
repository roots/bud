import * as Framework from '@roots/bud-framework'
import {ensureFile, readJson, writeJson} from 'fs-extra'
import globby from 'globby'
import {bind} from 'helpful-decorators'

import {Peers} from './peers'
import {writeFile} from './project.dependencies'
import {repository} from './project.repository'

/**
 * Project service class
 *
 * @public
 */
export class Project
  extends Framework.Service
  implements Framework.Project.Interface
{
  /**
   * Service ident
   *
   * @public
   */
  public ident = 'bud.project'

  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  public repository = repository

  public lastProfile: Record<string, any>

  public async bootstrap() {
    this.peers = new Peers(this.app)
  }

  public get flush(): boolean {
    return this.app.options.config.cli.flags.flush
  }

  public get profilePath(): string {
    return this.app.path(
      'project',
      this.storagePath,
      this.app.name,
      'profile.json',
    )
  }

  public get storagePath(): string {
    const manifestValues = this.manifest[`${this.app.name}`]

    return (
      this.app.options.config.cli.flags['location.storage'] ??
      manifestValues?.location?.storage ??
      this.app.options.config.location.storage
    )
  }

  public previous: Record<string, any>

  public manifest: Record<string, any>

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.manifest = await this.readManifest()
    this.previous = await this.readProfile()
    this.flush && writeJson(this.profilePath, {})

    const manifestUnchanged =
      JSON.stringify(this.manifest, null, 2) ===
      JSON.stringify(this.previous?.manifest, null, 2)

    this.set('cli', this.app.store.get('cli'))
    this.set('env', {
      public: this.app.env.getPublicEnv(),
      all: this.app.env.all(),
    })
    this.set('manifest', this.manifest)
    this.set('dependencies', [
      this.app.path('project', 'package.json'),
    ])

    if (this.flush)
      this.logger.note({
        message:
          'will rebuild profile because --flush was passed',
      })

    if (!this.previous)
      this.logger.note({
        message:
          'will rebuild profile because there is no stored profile data',
      })

    if (!manifestUnchanged) {
      this.logger.note({
        message:
          'will rebuild profile because the manifest has changed between builds',
      })
    }

    if (
      this.previous &&
      manifestUnchanged &&
      !this.flush &&
      !this.app.store.is('features.install', true)
    ) {
      this.logger.info({
        message:
          'saved profile is still valid. run with `--flush` to force a rebuild.',
      })

      this.mergeStore(this.previous)

      return
    }

    if (this.app.store.is('features.install', true)) {
      await this.refreshProfile()
      if (this.isEmpty('unmet')) return

      await this.app.dependencies.install(this.get('unmet'))

      await this.refreshManifest()
    }

    await this.refreshProfile()
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
   * Read manifest
   *
   * @public
   */
  @bind
  public async readManifest(): Promise<Record<string, any>> {
    return await readJson(
      this.app.path('project', 'package.json'),
    )
  }

  /**
   * Update manifest data
   *
   * @public
   */
  @bind
  public async refreshManifest() {
    if (!this.manifest) {
      this.log('error', {
        message: 'manifest not available',
        suffix: this.app.path('project', 'package.json'),
      })
      return this.app.dump(this.manifest, {
        prefix: 'project.manifest',
      })
    }

    this.set('manifest', this.manifest)

    this.log('success', {
      message: 'profiled manifest',
      suffix: this.manifest.name,
    })

    this.set('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })

    const featuresKey = `manifest.${this.app.name}.features`
    const locationKey = `manifest.${this.app.name}.location`

    if (this.has(featuresKey)) {
      this.log('log', {
        message: 'merging manifest features key',
        suffix: featuresKey,
      })
      this.app.store.merge('features', this.get(featuresKey))
    }

    const locationOverriden =
      this.get('cli.flags')[`location.${locationKey}`]

    if (this.has(locationKey) && !locationOverriden) {
      this.log('log', {
        message: 'setting location from manifest',
        suffix: JSON.stringify(this.get(locationKey)),
      })
      this.app.store.merge('location', this.get(locationKey))
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

  /**
   * @public
   */
  @bind
  public async refreshProfile() {
    await ensureFile(this.profilePath)
    await this.refreshManifest()
    this.log('time', 'building profile')

    try {
      await this.resolvePeers()
      await this.searchConfigs()

      await this.writeProfile()
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
    await writeFile(this.profilePath, JSON.stringify(this.all()))
    this.log('success', {
      message: 'writing profile to disk',
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
      const search = await globby(searchStrings, {
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

          this.merge('dependencies', [
            this.app.path('project', result),
          ])

          if (
            !result.endsWith('json') &&
            !result.endsWith('yml')
          ) {
            return this.merge(key, [
              this.app.path('project', result),
            ])
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
                  this.app.yml.read(
                    this.app.path('project', result),
                  ),
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
