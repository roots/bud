/* eslint-disable no-console */
import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import type * as cli from '@roots/bud/cli/app'
import type {Context} from '@roots/bud-framework/options'
import {bind} from '@roots/bud-support/decorators'
import globby from '@roots/bud-support/globby'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import {isString} from '@roots/bud-support/lodash-es'

/**
 * Command finder class
 *
 * @public
 */
export class Commands {
  /**
   * @public
   */
  public static instance: Commands

  /**
   * @internal
   */
  private constructor(
    public context: Partial<Context>,
    public application: cli.Cli,
  ) {}

  /**
   * @public
   * @static
   */
  public static get(application: cli.Cli, context: Partial<Context>) {
    if (Commands.instance) return Commands.instance
    else {
      Commands.instance = new Commands(context, application)
      return Commands.instance
    }
  }

  /**
   * @decorator `@bind`
   * @public
   */
  @bind
  public async getCommands() {
    const resolvedExtensionPaths = await this.getRegistrationModulePaths()
    return resolvedExtensionPaths.filter(Boolean)
  }

  /**
   * @decorator `@bind`
   * @public
   */
  @bind
  public async getRegistrationModulePaths(): Promise<Array<any>> {
    return await this.resolveExtensionCommandPaths(
      this.getProjectDependencySignifiers(),
    ).then(this.findExtensionCommandPaths)
  }

  /**
   * Get array of project dependency and devDependency signifiers
   * @decorator `@bind`
   * @public
   */
  @bind
  public getProjectDependencySignifiers(): Array<string> {
    return Object.keys({
      ...(this.context.manifest?.dependencies ?? {}),
      ...(this.context.manifest?.devDependencies ?? {}),
    }).filter(signifier => !signifier.startsWith(`@types`))
  }

  /**
   * Find commands shipped with a given extension
   * @decorator `@bind`
   * @public
   */
  @bind
  public async findExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths
        .map(dirname)
        .map(
          async path =>
            await globby(join(path, join(`bud`, `commands`, `index.js`))),
        ),
    ).then(results => results.flat())
  }

  public async resolveExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(async path => {
        try {
          return resolve(path, import.meta.url)
        } catch (error) {
          console.warn(error)
          return false
        }
      }),
    ).then(paths => paths.filter(isString).map(fileURLToPath))
  }

  /**
   * Import and register commands with the clipanion app
   * @decorator `@bind`
   */
  @bind
  public async registerExtensionCommandPaths(
    registerCallback: CallableFunction,
  ) {
    try {
      await registerCallback(this.application)
    } catch (error) {
      console.warn(error)
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
          } catch (error) {
            throw new Error(error)
          }
        }),
      )
    } catch (error) {
      console.warn(error)
    }
  }
}
