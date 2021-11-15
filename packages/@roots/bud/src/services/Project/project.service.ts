import * as Framework from '@roots/bud-framework'
import {ensureFile, readJson} from 'fs-extra'
import globby from 'globby'
import {once} from 'helpful-decorators'
import {join} from 'path'

import {Peers} from './peers'
import {bind, writeFile} from './project.dependencies'
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
    return this.is('cli.flags.flush', true)
  }

  public get manifestPath(): string {
    return join(
      this.app.options.config.location.project,
      'package.json',
    )
  }

  public get profilePath(): string {
    return join(
      this.projectPath,
      this.storagePath,
      this.app.name,
      `profile.json`,
    )
  }

  public get projectPath(): string {
    return (
      this.app.options.config.cli.flags['location.project'] ??
      this.app.options.config.location.project
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

  @bind
  public async register() {
    /**
     * We'll need an unmodified
     */
    this.manifest = await this.readManifest()
    this.previous = await this.readProfile()

    const manifestUnchanged =
      JSON.stringify(this.manifest, null, 2) ===
      JSON.stringify(this.previous?.manifest, null, 2)

    this.app.store.set('location.storage', this.storagePath)
    this.app.store.set('location.project', this.projectPath)

    this.setStore({
      ...(this.repository ?? {}),
      cli: this.app.store.get('cli'),
      env: {
        public: this.app.env.getPublicEnv(),
        all: this.app.env.all(),
      },
      manifest: this.manifest,
      dependencies: [this.manifestPath],
    })

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
      !this.flush &&
      this.previous &&
      manifestUnchanged &&
      !this.app.store.is('features.install', true)
    ) {
      this.logger.info({
        message:
          'saved profile is still valid. run with `--flush` to force a rebuild.',
      })
      this.setStore(this.previous)
    }

    if (this.app.store.is('features.install', true)) {
      await this.refreshProfile()

      if (!this.get('unmet').length) return

      await this.app.dependencies.install(this.get('unmet'))

      await this.refreshManifest()
    }

    const profile = await this.refreshProfile()
    this.mergeStore(profile)
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
    return await readJson(this.manifestPath)
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
        suffix: this.manifestPath,
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
    if (this.has(featuresKey)) {
      this.log('info', {
        prefix: 'manifest',
        message: 'merging features',
        suffix: featuresKey,
      })
      this.app.store.merge('features', this.get(featuresKey))
    }

    const locationKey = `manifest.${this.app.name}.location`
    const locationOverriden =
      this.get('cli.flags')[`location.${locationKey}`]

    if (this.has(locationKey) && !locationOverriden) {
      this.log('info', {
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
    await this.refreshManifest()

    this.log('time', 'building profile')
    await ensureFile(this.profilePath)

    try {
      await this.resolvePeers()
      await this.searchConfigs()
      await this.writeProfile()

      this.log('timeEnd', `building profile`)

      return this.readProfile()
    } catch (e) {
      this.log('error', {
        message: 'building profile',
        suffix: e,
      })
      this.log('timeEnd', 'building profile')
    }
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
  @once
  public async readProfile() {
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
  @once
  public async searchConfigs() {
    this.log('await', 'reading project configuration files')

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
      ].map(
        async function findConfig({key, searchStrings}) {
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

              this.mutate('dependencies', i =>
                Array.from(
                  new Set([
                    ...i,
                    this.app.path('project', result),
                  ]),
                ),
              )

              if (
                !result.endsWith('json') &&
                !result.endsWith('yml')
              ) {
                return this.mutate(key, i =>
                  Array.from(
                    new Set([
                      ...i,
                      this.app.path('project', result),
                    ]),
                  ),
                )
              }

              if (result.endsWith('.json')) {
                return this.mutate(key, i =>
                  Array.from(
                    new Set([
                      ...i,
                      this.app.json.read(
                        this.app.path('project', result),
                      ),
                    ]),
                  ),
                )
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
        }.bind(this),
      ),
    )
  }
}
