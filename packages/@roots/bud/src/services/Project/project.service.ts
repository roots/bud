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

  public async register() {
    await this.addManifestDataToStore()
    this.savedProfile = await this.readProfile()

    this.setStore({
      ...this.repository,
      cli: this.app.store.get('cli'),
      env: {
        public: this.app.env.getPublicEnv(),
        all: this.app.env.all(),
      },
      manifestPath: this.app.path('project', 'package.json'),
      dependencies: [this.app.path('project', 'package.json')],
    })

    const shouldLoadProfileFromDisk =
      this.app.store.is('cli.flags.flush', false) &&
      this.app.store.is('cli.flags.cache', true) &&
      this.savedProfile

    if (shouldLoadProfileFromDisk) {
      this.setStore(this.savedProfile)
      this.log('success', 'profile loaded from disk')
    }

    if (!shouldLoadProfileFromDisk) {
      await this.refreshProfile()
    }

    this.log(
      'info',
      `inject feature is ${
        this.app.store.is('features.inject', true)
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
  }

  @bind
  public async registered(): Promise<void> {}

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
  public async addManifestDataToStore() {
    try {
      this.set(
        'manifestPath',
        join(process.cwd(), 'package.json'),
      )
      const manifest = await readJson(this.get('manifestPath'))
      this.set('manifest', manifest)
    } catch (e) {
      this.log('error', 'manifest file not found', e)
    }

    this.set('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })

    this.app
      .when(
        this.has(`manifest.${this.app.name}.features.inject`),
        ({store}) =>
          store.set(
            'inject',
            this.get(
              `manifest.${this.app.name}.features.inject`,
            ),
          ),
      )
      .when(
        this.has(`manifest.${this.app.name}.locations`),
        () =>
          this.app.store.merge(
            'location',
            this.get(`manifest.${this.app.name}.locations`),
          ),
      )
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
    return this.app.path(
      'storage',
      `${this.app.name}/profile.json`,
    )
  }

  /**
   * @public
   */
  @bind
  public async refreshProfile() {
    !this.savedProfile &&
      this.log('await', 'building project profile.')

    this.is('cli.flags.flush', true) &&
      this.log('await', 'rebuilding project profile')

    try {
      await this.resolvePeers()
      await this.searchConfigs()
      await this.writeProfile()
    } catch (e) {
      this.log('error', e)
    }
  }

  /**
   * @public
   */
  @bind
  public async writeProfile() {
    this.log(
      'await',
      'writing profile to disk',
      this.getProfileLocation(),
    )
    await ensureFile(this.getProfileLocation())

    await writeFile(
      this.getProfileLocation(),
      JSON.stringify(this.all()),
    )

    this.log(
      'success',
      `project profile saved to`,
      this.getProfileLocation(),
    )
  }

  @bind
  public async readProfile() {
    const location = this.getProfileLocation()

    this.log('await', 'reading profile from location', location)

    if (location === null) return

    try {
      const res = await readJson(location)
      this.log(
        'success',
        `project profile loaded from`,
        location,
      )
      return res
    } catch (e) {
      this.log(
        'warn',
        'failed to load project profile from',
        location,
      )

      return false
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
