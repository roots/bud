import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {ModuleError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import logger from '@roots/bud-support/logger'
import args from '@roots/bud-support/utilities/args'
import {paths} from '@roots/bud-support/utilities/paths'

import {type Bud} from './index.js'
import {Service} from './service.js'

/**
 * Module resolver
 */
export class Module extends Service {
  /**
   * Resolved module cache
   */
  public resolved: Record<string, string> = {}

  /**
   * {@link Service.bootstrap}
   */
  @bind
  public override async bootstrap(bud: Bud) {
    if (args.force) {
      logger
        .scope(`module`)
        .info(`flushing resolutions`, this.resolutionsPath)
    }

    if (!this.cacheEnabled) {
      this.resolved = {}
      return
    }

    const data = await bud.fs.read(this.resolutionsPath).catch(error => {
      logger.scope(`module`).info(`cache is enabled but no cache exists`)
      this.resolved = {}
    })

    if (!data?.resolutions) {
      logger
        .scope(`module`)
        .info(`cache is enabled but resolution data is missing`, data)

      this.resolved = {}
      return
    }

    logger
      .scope(`module`)
      .info(`cache is enabled and cached resolutions exist`, data)

    this.resolved = data.resolutions
  }

  /**
   * Cache enabled
   */
  public get cacheEnabled(): boolean {
    if (args.force === true) return false
    if (args.cache === false) return false

    return true
  }

  /**
   * {@link Service.compilerBefore}
   */
  @bind
  public override async compilerBefore?(bud: Bud) {
    await bud.fs.write(this.resolutionsPath, {
      resolutions: this.resolved,
      version: bud.context.bud.version,
    })
  }

  /**
   * {@link Service.compilerDone}
   */
  @bind
  public override async compilerDone?(bud: Bud) {
    await bud.fs.write(this.resolutionsPath, {
      resolutions: this.resolved,
      version: bud.context.bud.version,
    })
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, context?: string) {
    return await this.resolve(signifier, context)
      .then(path => relative(this.app.context.basedir, path))
      .then(path => path.split(signifier).shift())
      .then(path => this.app.path(path as any, signifier))
      .catch(error => {
        throw error
      })
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getManifestPath(pkgName: string) {
    return await this.getDirectory(pkgName)
      .then(dir => this.app.path(dir, `package.json`))
      .catch(error => {
        throw error
      })
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import<T extends string>(
    signifier: T,
    context?: string,
    options: {bustCache?: boolean; raw?: boolean} = {
      bustCache: false,
      raw: false,
    },
  ) {
    if (this.resolved?.[signifier]) {
      const path = options.bustCache
        ? `${this.resolved[signifier]}?v=${Date.now()}`
        : this.resolved[signifier]
      const result = await import(path).catch(error => {
        logger
          .scope(`module`)
          .info(
            `Could not import ${signifier} from ${this.resolved[signifier]}. Removing from cached module registry.`,
            error,
          )

        this.resolved[signifier] = undefined
      })

      return options.raw ? result : result?.default ?? result
    }

    const path = await this.resolve(signifier, context).catch(error => {
      throw error
    })
    const result = await import(path).catch(error => {
      throw error
    })

    logger.scope(`module`).info(`[cache miss]`, `imported`, signifier)
    return options.raw ? result : result?.default ?? result
  }

  /**
   * Make context URL
   */
  @bind
  public makeContextURL(context?: string): string {
    return (
      context ??
      (pathToFileURL(
        join(this.app.context.basedir, `package.json`),
      ) as unknown as string)
    )
  }

  /**
   * Read `package.json` manifest from a module signifier
   */
  @bind
  public async readManifest(signifier: string) {
    return await this.getManifestPath(signifier).then(async path => {
      logger.scope(`module`).info(signifier, `manifest resolved to`, path)
      return await this.app.fs.read(path)
    })
  }

  /**
   * Cache location
   */
  public get resolutionsPath(): string {
    return join(paths.storage, `bud.resolutions.yml`)
  }

  /**
   * Resolve a module path from its signifier
   */
  @bind
  public async resolve(
    signifier: string,
    context?: string,
  ): Promise<string> {
    let errors = []

    if (this.resolved?.[signifier]) {
      logger
        .scope(`module`)
        .info(
          `[cache hit]`,
          `resolved ${signifier} to ${this.resolved[signifier]}`,
        )

      return this.resolved[signifier]
    }

    await resolve(signifier, this.makeContextURL())
      .then(path => {
        this.resolved[signifier] = normalize(fileURLToPath(path))
        logger
          .scope(`module`)
          .info(
            `[cache miss]`,
            `resolved ${signifier} to ${this.resolved[signifier]}`,
          )
      })
      .catch(error => {
        errors.push(
          `Could not resolve ${signifier} from ${context}: ${error.message}`,
        )
      })

    if (this.resolved[signifier]) return this.resolved[signifier]

    await resolve(signifier, this.makeContextURL(context))
      .then(path => {
        this.resolved[signifier] = normalize(fileURLToPath(path))
        logger
          .scope(`module`)
          .info(
            `[cache miss]`,
            `resolved ${signifier} to ${this.resolved[signifier]}`,
          )
      })
      .catch(error => {
        errors.push(
          `Could not resolve ${signifier} from ${this.makeContextURL(
            context,
          )}: ${error.message}`,
        )
      })

    if (this.resolved[signifier]) return this.resolved[signifier]

    throw new ModuleError(`Could not resolve ${signifier}`, {
      cause: errors.reverse().join(`\n`),
    })
  }
}
