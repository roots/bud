import * as Framework from '@roots/bud-framework'
import {ensureFile, readJson} from 'fs-extra'
import globby from 'globby'
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

  public savedProfile: Record<string, any>

  public async bootstrap() {
    this.peers = new Peers(this.app)
  }

  public get flush(): boolean {
    return this.is('cli.flags.flush', true)
  }

  public async register() {
    const manifestPath = join(
      this.app.options.config.location.project,
      'package.json',
    )
    await this.addManifestDataToStore(manifestPath)
    this.savedProfile = await this.readProfile()

    this.setStore({
      ...(this.repository ?? {}),
      cli: this.app.store.get('cli'),
      env: {
        public: this.app.env.getPublicEnv(),
        all: this.app.env.all(),
      },
      dependencies: [this.get('manifestPath')],
    })

    if (this.app.store.is('features.install', true)) {
      await this.refreshProfile()
      if (!this.get('unmet').length) return

      await this.app.dependencies.install(this.get('unmet'))
      await this.addManifestDataToStore(manifestPath)
      await this.refreshProfile()
      this.savedProfile = await this.readProfile()
      this.setStore(this.savedProfile)
    } else if (!this.flush && this.savedProfile) {
      this.setStore(this.savedProfile)
    } else {
      await this.refreshProfile()
      this.savedProfile = await this.readProfile()
      this.setStore(this.savedProfile)
    }
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

  @bind
  public async addManifestDataToStore(manifestPath: string) {
    try {
      this.set('manifestPath', manifestPath)
      const manifest = await readJson(manifestPath)
      this.set('manifest', manifest)
      this.log('success', {
        prefix: 'manifest',
        message: 'added to project store',
      })
    } catch (e) {
      this.log('error', {
        prefix: 'manifest',
        message: 'read',
        suffix: manifestPath,
      })
      return
    }

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
    if (this.has(locationKey)) {
      this.log('info', {
        prefix: 'manifest',
        message: 'merging locations',
        suffix: locationKey,
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

  @bind
  public getProfileLocation(): string {
    return join(
      this.app.options.config.cli.flags['location.project'] ??
        this.get('manifest.location.project') ??
        this.app.options.config.location.project,
      this.app.options.config.cli.flags['location.storage'] ??
        this.get('manifest.location.storage') ??
        this.app.options.config.location.storage,
      `${this.app.name}/profile.json`,
    )
  }

  /**
   * @public
   */
  @bind
  public async refreshProfile() {
    const profileLocation = this.getProfileLocation()

    this.log('time', `building profile`)

    await ensureFile(profileLocation)

    try {
      await this.resolvePeers()
      await this.searchConfigs()
      await this.writeProfile()
      this.log('timeEnd', `building profile`)
    } catch (e) {
      this.log('error', {
        prefix: 'profile',
        message: 'building',
        suffix: e,
      })
      this.log('timeEnd', `building profile`)
    }
  }

  /**
   * @public
   */
  @bind
  public async writeProfile() {
    const profileLocation = this.getProfileLocation()

    this.log('await', {
      prefix: 'profile',
      message: 'writing',
      suffix: profileLocation,
    })

    await ensureFile(profileLocation)

    await writeFile(profileLocation, JSON.stringify(this.all()))

    this.log('success', {
      prefix: 'profile',
      message: 'writing',
      suffix: profileLocation,
    })
  }

  @bind
  public async readProfile() {
    const location = this.getProfileLocation()

    this.log('await', {
      prefix: 'profile',
      message: 'read',
      suffix: location,
    })

    try {
      const res = await readJson(location)
      this.log('success', {
        prefix: 'profile',
        message: 'read',
        suffix: location,
      })
      return res
    } catch (e) {
      this.log('error', {
        prefix: 'profile',
        message: 'read',
        suffix: location,
      })
    }
  }

  @bind
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
              this.log('note', 'imported', key, result)

              let config
              if (key.startsWith('configs.json')) {
                config = result
              } else {
                config = this.app.path('project', result)
              }

              const existing = this.get('dependencies')
              this.set(
                'dependencies',
                Array.from(new Set([...existing, config])),
              )

              if (
                !result.endsWith('json') &&
                !result.endsWith('yml')
              ) {
                this.set(key, this.app.path('project', result))
                return
              }

              let resultObj
              if (result.endsWith('.json')) {
                resultObj = await this.app.json.read(result)
              }

              if (result.endsWith('.yml')) {
                resultObj = await this.app.yml.read(result)
              }

              const existingStatic = this.get(key)
              this.set(
                key,
                Array.from(
                  new Set([...existingStatic, resultObj]),
                ),
              )
            }),
          )

          this.log(
            'success',
            'imported configs',
            `(${search.length})`,
          )
        }.bind(this),
      ),
    )
  }
}
