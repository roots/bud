/* eslint-disable no-console */
import type {Context} from '@roots/bud-framework/options'

import {bind} from '@roots/bud-support/decorators/bind'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isString from '@roots/bud-support/lodash/isString'
import {filesystem} from '@roots/bud-support/utilities/filesystem'
import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import type {Cli} from './app.js'

/**
 * Command finder class
 */
export class Commands {
  public static instance: Commands
  public fs: typeof filesystem = filesystem
  public paths: Array<string>

  /**
   */
  private constructor(
    public context: Partial<Context>,
    public application: Cli,
  ) {}

  /**
   * @public
   * @static
   */
  public static get(application: Cli, context: Partial<Context>) {
    if (Commands.instance) return Commands.instance
    else {
      Commands.instance = new Commands(context, application)
      return Commands.instance
    }
  }

  public static async importCommandsFromPaths(
    paths: Array<string>,
  ): Promise<any> {
    try {
      return await Promise.all(
        paths.map(async path => {
          try {
            return await import(path).then(
              ({default: register}) => register,
            )
          } catch (error) {}
        }),
      )
    } catch (error) {}
  }

  /**
   * Find commands shipped with a given extension
   */
  @bind
  public findExtensionCommandPaths(paths: Array<string>) {
    return paths
      .map(dirname)
      .map(path => join(path, join(`bud`, `commands`, `index.js`)))
  }

  /**
   * Get commands
   *
   * @remarks
   * Returns cached commands if they exist, otherwise
   * resolves and caches commands from project dependencies.
   */
  @bind
  public async getCommands() {
    try {
      if (
        await this.fs.exists(join(this.context.paths.storage, `commands`))
      ) {
        const paths = await this.fs.read(
          join(this.context.paths.storage, `commands.yml`),
        )
        if (Array.isArray(paths)) return paths
      }
    } catch (error) {}

    const resolvedExtensionPaths = await this.getRegistrationModulePaths()

    await this.fs.write(
      join(this.context.paths.storage, `commands.yml`),
      resolvedExtensionPaths,
    )

    return resolvedExtensionPaths
  }

  /**
   * Get array of project dependency and devDependency signifiers
   */
  @bind
  public getProjectDependencySignifiers(): Array<string> {
    return Object.keys({
      ...(this.context.manifest?.dependencies ?? {}),
      ...(this.context.manifest?.devDependencies ?? {}),
    }).filter(signifier => !signifier.startsWith(`@types`))
  }

  /**
   */
  @bind
  public async getRegistrationModulePaths(): Promise<Array<any>> {
    return await this.resolveExtensionCommandPaths(
      this.getProjectDependencySignifiers(),
    )
      .then(this.findExtensionCommandPaths)
      .then(this.resolveExtensionCommandPaths)
  }

  @bind
  public async resolveExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(async path => {
        try {
          return await resolve(path, import.meta.url)
        } catch (error) {}
      }),
    )
      .then(paths => paths.filter(isString).map(fileURLToPath))
      .then(
        async paths =>
          await Promise.all(
            paths.map(async path => {
              try {
                const exists = await this.fs.exists(path)
                if (exists) return path
              } catch (error) {}
            }),
          ).then(paths => paths.filter(Boolean)),
      )
  }
}
