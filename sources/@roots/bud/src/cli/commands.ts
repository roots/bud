/* eslint-disable no-console */
import type {Context} from '@roots/bud-framework/options'
import globby from '@roots/bud-support/globby'
import {isString} from '@roots/bud-support/lodash-es'
import {resolve} from 'import-meta-resolve'
import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import type * as cli from './app.js'

export class Commands {
  public application: cli.Cli
  public context: Partial<Context>
  public static instance: Commands

  private constructor(context: Partial<Context>, application: cli.Cli) {
    this.context = context
    this.application = application
  }

  public static get(application: cli.Cli, context: Partial<Context>) {
    if (Commands.instance) return Commands.instance
    else {
      Commands.instance = new Commands(context, application)
      return Commands.instance
    }
  }

  public async getCommands() {
    const resolvedExtensionPaths = await this.getRegistrationModulePaths()
    return resolvedExtensionPaths.filter(Boolean)
  }

  public async getRegistrationModulePaths(): Promise<Array<any>> {
    return await this.resolveExtensionCommandPaths(
      this.getProjectDependencySignifiers(),
    ).then(this.findExtensionCommandPaths)
  }

  /**
   * Get array of project dependency and devDependency signifiers
   */
  public getProjectDependencySignifiers(): Array<string> {
    return Object.keys({
      ...(this.context.manifest?.dependencies ?? {}),
      ...(this.context.manifest?.devDependencies ?? {}),
    }).filter(signifier => !signifier.startsWith(`@types`))
  }

  /**
   * Find commands shipped with a given extension
   */
  public async findExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths
        .map(dirname)
        .map(async path =>
          globby(join(path, join(`bud`, `commands`, `index.js`))),
        ),
    ).then(results => results.flat())
  }

  public async resolveExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(async path => {
        try {
          return resolve(path, import.meta.url)
        } catch (err) {
          console.warn(err)
          return false
        }
      }),
    ).then(paths => paths.filter(isString).map(fileURLToPath))
  }

  /**
   * Import and register commands with the clipanion app
   */
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
