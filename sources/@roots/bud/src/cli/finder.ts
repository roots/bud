/* eslint-disable no-console */
import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import type {Context} from '@roots/bud-framework/options'
import {bind} from '@roots/bud-support/decorators/bind'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isString from '@roots/bud-support/lodash/isString'

import type {Cli} from './app.js'

/**
 * Command finder class
 */
export class Commands {
  public static instance: Commands

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

  /**
   */
  @bind
  public async getCommands() {
    const resolvedExtensionPaths = await this.getRegistrationModulePaths()
    return resolvedExtensionPaths.filter(Boolean)
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
  public findExtensionCommandPaths(paths: Array<string>) {
    return paths
      .map(dirname)
      .map(path => join(path, join(`bud`, `commands`, `index.js`)))
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
   * Import and register commands with the clipanion app
   */
  @bind
  public async registerExtensionCommandPaths(
    registerCallback: CallableFunction,
  ) {
    try {
      await registerCallback(this.application)
    } catch (error) {}
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
}
