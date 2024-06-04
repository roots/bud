import type {Bud} from '@roots/bud-framework'

import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isEqual from '@roots/bud-support/isEqual'
import logger from '@roots/bud-support/logger'
import noop from '@roots/bud-support/noop'

/**
 * Import method options
 */
interface ImportOptions {
  bustCache?: boolean
  raw?: boolean
  reject?: boolean
}

/**
 * Map of module signifiers to absolute paths
 */
type Resolutions = Record<string, string>

/**
 * Module cache data
 */
interface ModuleCache {
  resolutions: Resolutions
  sha1: string
  version: string
}

/**
 * Module resolver
 */
export class Module extends Service {
  /**
   * Bootstrapped args
   */
  public declare args: {
    cache?: boolean
    force?: boolean
  }

  /**
   * Cached resolutions data
   */
  public cache: ModuleCache = {
    resolutions: {},
    sha1: null,
    version: null,
  }

  /**
   * Bootstrapped paths
   */
  public declare paths: {
    storage: string
  }

  /**
   * Resolved module paths
   */
  public resolutions: Resolutions = {}

  /**
   * Cache enabled
   */
  public get cacheEnabled(): boolean {
    return this.args.force !== true
  }

  /**
   * Cache location
   */
  public get cachePath(): string {
    return join(this.paths.storage, `bud.resolutions.yml`)
  }

  /**
   * Constructor
   */
  public constructor(options: {
    app: () => Bud
    args: Record<string, any>
    paths: {storage: string}
  }) {
    super(options.app)

    this.args = options.args
    this.paths = options.paths
  }

  /**
   * {@link Service.bootstrap}
   */
  @bind
  public override async bootstrap(bud: Bud) {
    if (!this.cacheEnabled) {
      logger.scope(`module`).log(`Forcing reset of module cache.`)
      return await this.removeCachedResolutions()
    }
    logger.scope(`module`).log(`Cache is enabled`)

    if (await bud.fs.exists(this.cachePath)) {
      logger.scope(`module`).log(`Cache file exists:`, this.cachePath)
      const cache = await bud.fs.read(this.cachePath).catch(noop)
      if (cache) this.cache = cache
      this.resolutions = {...this.cache.resolutions}
    }

    if (
      !this.cache?.resolutions ||
      this.cache?.sha1 !== bud.context.files[`package`]?.sha1
    ) {
      logger
        .scope(`module`)
        .log(
          `Project manifest has changed. Forcing reset of module cache.`,
        )

      return await this.removeCachedResolutions()
    }
  }

  /**
   * At end of process write resolutions to cache
   */
  @bind
  public async after(bud: Bud) {
    if (isEqual(this.cache.resolutions, this.resolutions)) {
      logger.scope(`module`).log(`Resolutions unchanged. Skipping write.`)
      return bud
    }

    await this.writeResolutions()

    return bud
  }

  /**
   * Handle error
   *
   * @param messages - error messages for logging
   * @returns
   */
  public async handleError(...messages: string[]): Promise<void> {
    messages.length && logger.scope(`module`).log(...messages)

    await this.removeCachedResolutions(messages.join(` `))
    throw BudError.normalize(messages.join(` `))
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, context?: string) {
    logger.scope(`module`).info(`getDirectory`, signifier, context)

    const modulePath = await this.resolve(signifier, context)
    if (!modulePath) return false

    const relativeDir = relative(this.app.context.basedir, modulePath)
      .split(signifier)
      .shift()

    return this.app.path(relativeDir, signifier)
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getManifestPath(signifier: string) {
    logger.scope(`module`).info(`getManifestPath`, signifier)

    const directory = await this.getDirectory(signifier)
    if (!directory) return false

    return this.app.path(directory, `package.json`)
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import(
    signifier: string,
    context?: string,
    options: ImportOptions = {
      bustCache: false,
      raw: false,
      reject: true,
    },
  ) {
    if (options.bustCache) {
      signifier = `${signifier}?v=${Date.now()}`
    }

    if (!this.hasResolution(signifier)) {
      await this.resolve(signifier, context).catch(this.catch)
    }

    const code = await import(this.getResolution(signifier)).catch(
      async error => {
        if (options.reject)
          return await this.handleError(error.message ?? error)
      },
    )
    if (!code && options.reject) {
      return await this.handleError(`Could not import ${signifier}`)
    }

    logger.scope(`module`).log(`Imported module:`, signifier)

    return options.raw ? code : code?.default ?? code
  }

  /**
   * Make context URL
   */
  @bind
  public makeContextURL(context?: string | URL): URL {
    if (context instanceof URL) return context
    if (context) return pathToFileURL(context)

    return pathToFileURL(join(this.app.context.basedir, `package.json`))
  }

  /**
   * Read `package.json` manifest from a module signifier
   */
  @bind
  public async readManifest(signifier: string) {
    const manifestPath = await this.getManifestPath(signifier)
    if (!manifestPath) return false

    const value = await this.app.fs.read(manifestPath)
    logger.scope(`module`).info(signifier, `manifest`, value)

    return value
  }

  /**
   * Reset cached resolutions
   */
  @bind
  public async removeCachedResolutions(error?: string) {
    if (await this.app.fs.exists(this.cachePath)) {
      logger.scope(`module`).log(`Removing cache file:`, this.cachePath)
      await this.app.fs.remove(this.cachePath)
    }

    this.cache = {
      resolutions: {},
      sha1: this.app.context.files[`package`]?.sha1,
      version: this.app.context.bud?.version,
    }

    this.resolutions = {}
  }

  /**
   * Resolve a module path from its signifier
   */
  @bind
  public async resolve(
    signifier: string,
    context?: string,
  ): Promise<false | string> {
    if (this.hasResolution(signifier)) {
      logger
        .scope(`module`)
        .log(`Cache hit:`, signifier, `=>`, this.getResolution(signifier))

      return this.getResolution(signifier)
    }

    const attemptResolution = (
      path: string,
      context?: string | URL,
    ): false | string => {
      const resolvedPath = resolve(path, context)
      if (!resolvedPath) return false
      return normalize(fileURLToPath(resolvedPath))
    }

    const resolved =
      attemptResolution(signifier, this.makeContextURL()) ??
      attemptResolution(signifier, this.makeContextURL(context))

    if (resolved) {
      logger.scope(`module`).log(`Cache miss:`, signifier, `=>`, resolved)

      this.setResolution(signifier, resolved)
    }

    return resolved
  }

  /**
   * Write resolutions to cache
   */
  public async writeResolutions(path?: string, data?: any) {
    logger
      .scope(`module`)
      .log(`writing resolutions`)
      .info(this.resolutions)

    await this.app.fs.write(path ?? this.cachePath, {
      resolutions: this.resolutions,
      sha1: this.app.context.files[`package`]?.sha1,
      version: this.app.context.bud.version,
      ...(data ?? {}),
    })
  }

  /**
   * Get a module resolution path
   */
  @bind
  public getResolution(signifier: string) {
    const resolved = this.resolutions[signifier]

    logger
      .scope(`module`)
      .info(`Resolved module:`, signifier, `=>`, resolved)

    return resolved
  }

  /**
   * Check if a module has been resolved
   */
  @bind
  public hasResolution(signifier: string): signifier is keyof Resolutions {
    return signifier in this.resolutions
  }

  /**
   * Remove a module resolution path
   *
   * @param signifier
   * @returns
   */
  @bind
  public removeResolution(signifier: string) {
    return delete this.resolutions[signifier]
  }

  /**
   * Set a module resolution path
   */
  @bind
  public setResolution(signifier: string, url: string) {
    this.resolutions[signifier] = url
  }
}
