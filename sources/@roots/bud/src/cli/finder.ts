/* eslint-disable no-console */
import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import type {Cli} from '@roots/bud/cli/app'
import type {Context} from '@roots/bud-framework/options'
import {bind} from '@roots/bud-support/decorators'
import globby from '@roots/bud-support/globby'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isString from '@roots/bud-support/lodash/isString'

interface CommandModule {
  default: RegisterFn
}

interface RegisterFn {
  (app: Cli): Promise<Cli>
}

/**
 * Command finder class
 */
export class Commands {
  /**
   * Singleton instance
   */
  public static instance: Commands

  /**
   * Static constructor
   */
  private constructor(
    public context: Partial<Context>,
    public application: Cli,
  ) {}

  /**
   * Get singleton instance
   */
  public static get(application: Cli, context: Partial<Context>) {
    if (Commands.instance) return Commands.instance
    else {
      Commands.instance = new Commands(context, application)
      return Commands.instance
    }
  }

  /**
   * Get registration module paths
   */
  @bind
  public async getRegistrationModulePaths(): Promise<Array<any>> {
    return await this.resolveExtensionCommandPaths(
      this.getProjectDependencySignifiers(),
    )
      .then(this.findExtensionCommandPaths)
      .then(commandPaths => commandPaths.filter(Boolean))
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
   * Find commands shipped with a given extension
   */
  @bind
  public async findExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths
        .map(dirname)
        .map(
          async path =>
            await globby(join(path, `bud`, `commands`, `index.js`)),
        ),
    ).then(results => results.flat())
  }

  public async resolveExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(async path => {
        try {
          return await resolve(path, import.meta.url)
        } catch (error) {}
      }),
    ).then(paths => paths.filter(isString).map(fileURLToPath))
  }

  /**
   * Import commands from an array of paths
   */
  public static async importCommandsFromPaths(
    paths: Array<string>,
  ): Promise<Array<RegisterFn>> {
    try {
      return await Promise.all(
        paths.map(async path => {
          try {
            return await import(path).then(
              ({default: register}: CommandModule) => register,
            )
          } catch (error) {}
        }),
      )
    } catch (error) {}
  }
}
