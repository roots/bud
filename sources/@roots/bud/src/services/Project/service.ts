import * as Framework from '@roots/bud-framework'
import {bind, fs, lodash} from '@roots/bud-support'

import {repository} from './repository'

const {isFunction, isString, omit} = lodash
const {ensureFile, writeFile} = fs

/**
 * Project service
 *
 * @public
 */
export class Project
  extends Framework.ContainerService
  implements Framework.Project.Service
{
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
      await ensureFile(
        this.app.path(`@storage/${this.app.name}/profile.json`),
      )
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
      async (app: Framework.Bud) => {
        await app.hooks.fire('event.project.write')
        await this.writeProfile()
      },
    )
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
  public async writeProfile() {
    await ensureFile(
      this.app.path(`@storage`, this.app.name, `profile.json`),
    )

    await writeFile(
      this.app.path(`@storage`, this.app.name, `profile.json`),
      this.app.json.stringify(this.repository, null, 2),
    )

    this.app.success({
      message: 'write profile',
      suffix: this.app.path(`@storage`, this.app.name, `profile.json`),
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
