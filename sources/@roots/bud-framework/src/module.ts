import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isEqual from '@roots/bud-support/isEqual'
import logger from '@roots/bud-support/logger'
import noop from '@roots/bud-support/noop'

import {type Bud} from './index.js'
import {Service} from './service.js'

/**
 * Import method options
 */
interface ImportOptions {
  bustCache?: boolean
  raw?: boolean
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
      logger.scope(`module`).log(`--force used. resetting cache.`)
      return await this.removeCachedResolutions()
    }

    if (await bud.fs.exists(this.cachePath)) {
      logger.scope(`module`).log(`cache is enabled and exists`)
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
          `cache is enabled but package.json has changed. resetiing cache.`,
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
      logger
        .scope(`module`)
        .log(`resolutions unchanged. skipping write.`)
        .info(`resolutions:`, this.resolutions)
        .info(`cache:`, this.cache)

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

    return await this.resolve(signifier, context)
      .then(path => relative(this.app.context.basedir, path))
      .then(path => path.split(signifier).shift())
      .then(path => this.app.path(path, signifier))
      .catch(this.catch)
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getManifestPath(signifier: string) {
    logger.scope(`module`).info(`getManifestPath`, signifier)
    return await this.getDirectory(signifier)
      .then(dir => this.app.path(dir, `package.json`))
      .catch(this.catch)
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
        return await this.handleError(error.message ?? error)
      },
    )
    if (!code) {
      return await this.handleError(`Could not import ${signifier}`)
    }

    logger.scope(`module`).log(`imported module:`, signifier)
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
    return await this.getManifestPath(signifier).then(async path => {
      const value = await this.app.fs.read(path)
      logger.scope(`module`).info(signifier, `manifest`, value)
      return value
    })
  }

  /**
   * Reset cached resolutions
   */
  @bind
  public async removeCachedResolutions(error?: string) {
    if (await this.app.fs.exists(this.cachePath)) {
      logger.scope(`module`).log(`removing cache file`, this.cachePath)
      await this.app.fs.remove(this.cachePath)
    }

    if (error) {
      await this.writeResolutions(
        this.cachePath.replace(
          `bud.resolutions.yml`,
          `bud.error.resolutions.yml`,
        ),
        {date: Date.now(), error},
      )
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
  ): Promise<string> {
    if (this.hasResolution(signifier)) {
      return this.getResolution(signifier)
    }

    await resolve(signifier, this.makeContextURL())
      .then(path => {
        this.setResolution(signifier, normalize(fileURLToPath(path)))

        logger
          .scope(`module`)
          .log(
            `[cache miss]`,
            `path:`,
            signifier,
            `=>`,
            this.getResolution(signifier),
          )
      })
      .catch(noop)

    if (this.hasResolution(signifier)) return this.getResolution(signifier)

    await resolve(signifier, this.makeContextURL(context))
      .then(path => {
        this.setResolution(signifier, normalize(fileURLToPath(path)))

        logger
          .scope(`module`)
          .log(
            `[cache miss]`,
            `path:`,
            signifier,
            `=>`,
            this.getResolution(signifier),
          )
      })
      .catch(noop)

    if (this.hasResolution(signifier)) {
      return this.getResolution(signifier)
    }

    await this.handleError(`Could not resolve`, signifier)
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
    logger
      .scope(`module`)
      .info(`resolved:`, signifier, `=>`, this.resolutions[signifier])

    return this.resolutions[signifier]
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
