/* eslint-disable no-console */
import type {Context} from '@roots/bud-framework/context'

import {dirname, join} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {filesystem} from '@roots/bud-support/filesystem'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isString from '@roots/bud-support/lodash/isString'

import type {Cli} from './app.js'

/**
 * Command finder class
 */
export class Finder {
  public static instance: Finder
  public fs: typeof filesystem = filesystem
  public paths: Array<string>

  /**
   * Class constructor
   */
  public constructor(
    public context: Partial<Context>,
    public application: Cli,
  ) {}

  /**
   * Clear command cache
   */
  @bind
  public async cacheClear() {
    try {
      if (await this.fs.exists(this.cachePath))
        await this.fs.remove(this.cachePath)
    } catch (error) {}
  }

  /**
   * Command cache path
   */
  public get cachePath() {
    return join(this.context.paths.storage, `bud.commands.yml`)
  }

  /**
   * Write command cache
   */
  @bind
  public async cacheWrite() {
    if (this.paths) await this.fs.write(this.cachePath, this.paths)
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
   * Get registration module paths
   */
  @bind
  public async findRegistrationModules(): Promise<Array<any>> {
    this.paths = await this.resolveExtensionCommandPaths(
      this.getProjectDependencySignifiers(),
    )
      .then(this.findExtensionCommandPaths)
      .then(this.resolveExtensionCommandPaths)

    return this.paths
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
   * Import commands
   */
  @bind
  public async importCommands(): Promise<any> {
    return await Promise.all(
      this.paths.map(async path => {
        try {
          return [
            path,
            await import(path).then(({default: register}) => register),
          ]
        } catch (error) {
          await this.cacheClear()
        }
      }),
    ).catch(this.cacheClear)
  }

  /**
   * Get commands
   *
   * @remarks
   * Returns cached commands if they exist, otherwise
   * resolves and caches commands from project dependencies.
   */
  @bind
  public async init() {
    const path = join(this.context.paths.storage, `bud.commands.yml`)
    try {
      if (await this.fs.exists(path)) {
        this.paths = await this.fs.read(path)
        if (Array.isArray(this.paths)) return this
        else throw new Error(`Invalid command cache.`)
      }
    } catch (error) {}

    await this.findRegistrationModules()
    await this.fs.write(path, this.paths)
    return this
  }

  @bind public async readCache() {
    return await this.fs.read(this.cachePath)
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
