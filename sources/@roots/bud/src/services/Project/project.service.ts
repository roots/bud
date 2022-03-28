import * as Framework from '@roots/bud-framework'
import {bind, fs, jsonStringify, lodash} from '@roots/bud-support'

import {Peers} from './peers'
import {repository} from './project.repository'

const {isFunction, isString, omit} = lodash
const {ensureFile, writeFile} = fs

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
   * Service bootstrap event
   *
   * @internal
   * @decorator `@bind`
   */
  public async bootstrap() {
    this.peers = new Peers(this.app)

    this.set(
      'context',
      omit(this.app.context, ['stdin', 'stderr', 'stdout']),
    ).set('publicEnv', this.app.env.getPublicEnv())

    await this.loadManifest()
  }

  /**
   * Service register event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async register() {
    try {
      await this.buildProfile()
    } catch (e) {
      this.app.error(e)
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
    await this.searchConfigs()

    this.app.hooks.action(
      'event.build.after',
      async (app: Framework.Framework) => {
        await app.hooks.fire('event.project.write')
        await this.writeProfile()
      },
    )
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
    this.set('manifest', this.app.context.manifest).merge('installed', {
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
    return this.has(`modules.${pkg}`)
  }

  /**
   * @public
   */
  @bind
  public async buildProfile() {
    await ensureFile(
      this.app.path(`@storage/${this.app.name}/profile.json`),
    )

    try {
      await this.resolvePeers()
    } catch (error) {
      this.app.error(error)
    }
  }

  /**
   * @public
   */
  @bind
  public async writeProfile() {
    await ensureFile(
      this.app.path(`@storage/${this.app.name}/profile.json`),
    )
    await writeFile(
      this.app.path(`@storage/${this.app.name}/profile.json`),
      jsonStringify(this.repository, null, 2),
    )

    this.app.log({
      message: 'write profile',
      suffix: this.app.path(`@storage/${this.app.name}/profile.json`),
    })
  }

  @bind
  public async searchConfigs() {
    await Promise.all(
      Object.entries(this.app.context.disk.config).map(
        async ([fileName, filePath]) => {
          const doYouEvenGoHere =
            !filePath ||
            !isString(filePath) ||
            !fileName ||
            !isString(fileName)

          if (doYouEvenGoHere)
            throw new Error(
              `File object with no path or filename received from context.disk.config by project.service`,
            )

          const hasCondition = (condition: string) =>
            filePath.includes(condition)

          const hasExtension = (extension: string) =>
            filePath.endsWith(extension)

          const condition = hasCondition('production')
            ? 'production'
            : hasCondition('development')
            ? 'development'
            : 'base'

          const rawImport =
            hasExtension('js') || hasExtension('ts')
              ? await import(filePath)
              : hasExtension('yml')
              ? await this.app.yml.read(filePath)
              : hasExtension('json')
              ? await this.app.json.read(filePath)
              : {}

          const processedModule =
            rawImport.default && isFunction(rawImport?.default)
              ? rawImport.default
              : rawImport

          this.set(['config', condition, fileName], {
            name: fileName,
            path: filePath,
            module: processedModule,
          })
        },
      ),
    )
  }
}
