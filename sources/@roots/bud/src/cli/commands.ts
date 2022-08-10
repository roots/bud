/* eslint-disable no-console */
import type {Context} from '@roots/bud-framework/src/config'
import {globby} from 'globby'
import {resolve} from 'import-meta-resolve'
import {dirname, join} from 'node:path/posix'

import getCache from '../context/cache.js'
import type * as cli from './app.js'

export class Commands {
  public application: cli.Cli
  public context: Partial<Context>
  public static instance: Commands
  public cache: any

  private constructor(context: Partial<Context>, application: cli.Cli) {
    this.context = context
    this.application = application
    this.cache = getCache(context.basedir)
  }

  public static get(application: cli.Cli, context: Partial<Context>) {
    if (Commands.instance) return Commands.instance
    else {
      Commands.instance = new Commands(context, application)
      return Commands.instance
    }
  }

  public async getCommands() {
    if (this.cache.has('cli.extension.paths')) {
      return this.cache.get('cli.extension.paths')
    }

    const resolvedExtensionPaths = await this.getRegistrationModulePaths()

    this.cache.set(
      'cli.extension.paths',
      resolvedExtensionPaths.filter(Boolean),
    )

    return this.cache.get('cli.extension.paths')
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
      ...(this.context.manifest.dependencies ?? {}),
      ...(this.context.manifest.devDependencies ?? {}),
    })
  }

  /**
   * Find commands shipped with a given extension
   */
  public async findExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(async path =>
        globby(
          join(
            dirname(path.replace('file://', '')),
            join('bud', 'commands', 'index.js'),
          ),
        ),
      ),
    ).then(results => results.flat())
  }

  public async resolveExtensionCommandPaths(paths: Array<string>) {
    return await Promise.all(
      paths.map(path => resolve(path, import.meta.url)),
    ).then(paths =>
      paths.filter(Boolean).map(path => path.replace('file://', '')),
    )
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
        paths.map(async path =>
          import(path).then(({default: register}) => register),
        ),
      )
    } catch (error) {
      console.warn(error)
    }
  }
}
