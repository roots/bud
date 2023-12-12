import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, ModuleError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import isEqual from '@roots/bud-support/isEqual'
import logger from '@roots/bud-support/logger'
import noop from '@roots/bud-support/noop'
import args from '@roots/bud-support/utilities/args'
import {paths} from '@roots/bud-support/utilities/paths'

import {type Bud} from './index.js'
import {Service} from './service.js'

/**
 * Map of module signifiers to absolute paths
 */
type Resolutions = Record<string, string>

/**
 * Module cache data
 */
interface ModuleCache {
  resolutions: Resolutions
  version: string
}

/**
 * Module resolver
 */
export class Module extends Service {
  /**
   * Cached resolutions data
   */
  public cache: ModuleCache = {
    resolutions: {},
    version: null,
  }

  /**
   * Imported modules
   */
  public modules: Record<string, any> = {}

  /**
   * Resolved module paths
   */
  public resolutions: Resolutions = {}

  /**
   * Cache enabled
   */
  public get cacheEnabled(): boolean {
    if (args.force === true) return false
    if (args.cache === false) return false

    return true
  }

  /**
   * Cache location
   */
  public get cachePath(): string {
    return join(paths.storage, `bud.resolutions.yml`)
  }

  /**
   * {@link Service.bootstrap}
   */
  @bind
  public override async bootstrap(bud: Bud) {
    if (args.force) {
      return await this.resetCache()
    }

    if (!this.cacheEnabled) {
      return this.logger
        .scope(`module`)
        .log(`cache disabled. skipping read.`)
    }

    if (await bud.fs.exists(this.cachePath)) {
      this.logger.scope(`module`).log(`cache is enabled and exists`)
      this.cache = await bud.fs.read(this.cachePath).catch(noop)

      if (!this.cache?.resolutions) {
        this.logger
          .scope(`module`)
          .log(`cache is enabled but resolution data is missing`)

        return await this.resetCache()
      }

      this.resolutions = {...this.cache.resolutions}
    }
  }

  /**
   * At end of process write resolutions to cache
   */
  @bind
  public async after(bud: Bud) {
    if (args.cache === false) {
      this.logger.scope(`module`).log(`cache disabled. skipping write.`)
      return bud
    }

    if (isEqual(this.cache.resolutions, this.resolutions)) {
      this.logger
        .scope(`module`)
        .log(`resolutions unchanged. skipping write.`)
        .info(`resolutions:`, this.resolutions)
        .info(`cache:`, this.cache.resolutions)
      return bud
    }

    logger
      .scope(`module`)
      .log(`writing resolutions`)
      .info(this.resolutions)

    await bud.fs.write(this.cachePath, {
      resolutions: this.resolutions,
      version: bud.context.bud.version,
    })

    return bud
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, context?: string) {
    this.logger.scope(`module`).info(`getDirectory`, signifier, context)

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
    this.logger.scope(`module`).info(`getManifestPath`, signifier)
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
    options: {bustCache?: boolean; raw?: boolean} = {
      bustCache: false,
      raw: false,
    },
  ) {
    if (options.bustCache) {
      signifier = `${signifier}?v=${Date.now()}`
    }

    if (this.hasModule(signifier)) {
      const code = this.getModule(signifier)
      logger.scope(`module`).log(`[cache hit]`, `module:`, signifier)
      return options.raw ? code : code?.default ?? code
    }

    if (!this.hasResolution(signifier)) {
      await this.resolve(signifier, context).catch(this.catch)
    }

    const code = await import(this.getResolution(signifier)).catch(
      error => {
        logger
          .scope(`module`)
          .log(
            `Could not import module:`,
            signifier,
            `Removing from cached module registry.`,
            error,
          )

        this.removeResolution(signifier)
      },
    )

    if (!code) {
      throw BudError.normalize(`Could not import ${signifier}`)
    }

    this.setModule(signifier, code)

    logger.scope(`module`).log(`imported module:`, signifier)
    return options.raw ? code : code?.default ?? code
  }

  /**
   * Make context URL
   */
  @bind
  public makeContextURL(context?: string): string {
    if (context) return context

    return pathToFileURL(
      join(this.app.context.basedir, `package.json`),
    ) as unknown as string
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
   * Reset cache
   */
  @bind
  public async resetCache() {
    this.logger.scope(`module`).log(`clearing runtime module cache`)

    this.cache = {
      resolutions: {},
      version: this.app.context.bud?.version,
    }
    this.resolutions = {...this.cache.resolutions}

    if (await this.app.fs.exists(this.cachePath)) {
      this.logger
        .scope(`module`)
        .log(`removing cache file`, this.cachePath)

      await this.app.fs.remove(this.cachePath)
    }
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
      logger
        .scope(`module`)
        .info(
          `[cache hit]`,
          `path:`,
          signifier,
          `=>`,
          this.getResolution(signifier),
        )

      return this.resolutions[signifier]
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
    if (this.hasResolution(signifier)) return this.getResolution(signifier)

    throw new ModuleError(`Could not resolve ${signifier}`)
  }

  /**
   * Get a previously imported module
   */
  @bind
  public getModule(signifier: string) {
    return this.modules[signifier]
  }

  /**
   * Check if a module has been imported
   */
  @bind
  public hasModule(signifier: string) {
    return signifier in this.modules
  }

  /**
   * Remove a module
   */
  @bind
  public removeModule(signifier: string) {
    return delete this.modules[signifier]
  }

  /**
   * Set a module
   */
  @bind
  public setModule(signifier: string, module: any) {
    this.modules[signifier] = module
  }

  /**
   * Get a module resolution
   */
  @bind
  public getResolution(signifier: string) {
    return this.resolutions[signifier]
  }

  /**
   * Check if a module has been resolved
   */
  @bind
  public hasResolution(signifier: string) {
    return signifier in this.resolutions
  }

  @bind
  public removeResolution(signifier: string) {
    return delete this.resolutions[signifier]
  }

  /**
   * Resolve a module from a particular URL
   */
  @bind
  public setResolution(signifier: string, url: string) {
    this.resolutions[signifier] = url
  }
}
