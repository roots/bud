import * as Framework from '@roots/bud-framework'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {isFunction, isString, omit} from 'lodash-es'

import type {repository} from './repository.js'

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
   * Service values repository
   *
   * @public
   */
  public repository: repository

  /**
   * Service bootstrap event
   *
   * @internal
   * @decorator `@bind`
   */
  public async bootstrap() {
    this.setStore({
      context: omit(this.app.context, ['stdin', 'stderr', 'stdout']),
      version: null,
      config: {
        development: {},
        production: {},
        base: {},
      },
      manifest: {},
      installed: {},
      publicEnv: this.app.env.getPublicEnv(),
    })

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
    if (!this.app.isRoot) return

    try {
      await fs.ensureFile(
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
    if (!this.app.isRoot) return

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
   * @decorator `@bind`
   */
  @bind
  public async loadManifest(): Promise<void> {
    this.set('manifest', this.app.context.manifest).merge('installed', {
      ...(this.get('manifest.devDependencies') ?? {}),
      ...(this.get('manifest.dependencies') ?? {}),
    })
  }

  /**
   * Write profile
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async writeProfile() {
    await fs.ensureFile(
      this.app.path(`@storage`, this.app.name, `profile.json`),
    )

    await fs.writeFile(
      this.app.path(`@storage`, this.app.name, `profile.json`),
      this.app.json.stringify(
        omit(this.repository, ['context.env']),
        null,
        2,
      ),
    )

    this.app.success({
      message: 'write profile',
      suffix: this.app.path(`@storage`, this.app.name, `profile.json`),
    })
  }

  /**
   * Search configs
   *
   * @public
   * @decorator `@bind`
   */
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
            filePath.split('/').pop().includes(condition)

          const hasExtension = (extension: string) =>
            filePath.endsWith(extension)

          const condition = hasCondition('production')
            ? 'production'
            : hasCondition('development')
            ? 'development'
            : 'base'

          const isDynamicConfig = [
            'js',
            'cjs',
            'mjs',
            'ts',
            'cts',
            'mts',
          ].filter(hasExtension).length

          const rawImport = isDynamicConfig
            ? await import(filePath)
            : hasExtension('yml')
            ? await this.app.yml.read(filePath)
            : hasExtension('json')
            ? await this.app.json.read(filePath)
            : {}

          const processedModule =
            rawImport?.default && isFunction(rawImport?.default)
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
