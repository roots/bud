/* eslint-disable no-console */
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Cli} from '../clipanion/index.js'
import {bind} from '../decorators/index.js'
import globby from '../globby/index.js'
import {resolve} from '../import-meta-resolve/index.js'
import isString from '../lodash/isString/index.js'

export class Commands {
  public constructor(
    public context: Partial<any>,
    public application: Cli,
  ) {}

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
    ).then(this.findExtensionCommandPaths)
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
            await globby(join(path, join(`bud`, `commands`, `index.js`))),
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
