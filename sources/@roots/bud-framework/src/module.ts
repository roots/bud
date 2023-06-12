import {bind} from '@roots/bud-support/decorators/bind'
import {ImportError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import get from '@roots/bud-support/lodash/get'
import set from '@roots/bud-support/lodash/set'
import args from '@roots/bud-support/utilities/args'
import logger from '@roots/bud-support/utilities/logger'
import {paths} from '@roots/bud-support/utilities/paths'
import {createRequire} from 'node:module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {type Bud} from './index.js'
import {Service} from './service.js'

/**
 * Module resolver
 */
export class Module extends Service {
  /**
   * Cache exists
   */
  public cacheValid: boolean

  /**
   * Node require
   */
  public require: NodeRequire

  /**
   * Resolved module cache
   */
  public resolved: Record<string, string> = {}

  /**
   * {@link Service.init}
   */
  @bind
  public override async bootstrap(bud: Bud) {
    this.require = createRequire(this.makeContextURL(bud.context.basedir))

    if (this.cacheEnabled && (await bud.fs.exists(this.cacheLocation))) {
      try {
        const data = await bud.fs.read(this.cacheLocation)
        logger
          .scope(`module`)
          .info(`cache is enabled and cached resolutions exist`)
          .info(data)

        if (data.version && data.version === bud.context?.bud?.version) {
          set(this, `resolved`, data.resolutions)
          set(this, `cacheValid`, true)
          return
        }
      } catch (e) {
        // noop
      }
    }

    set(this, `cacheValid`, false)
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
   * Cache location
   */
  public get cacheLocation(): string {
    return join(paths.storage, `resolutions.yml`)
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
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getManifestPath(pkgName: string) {
    return await this.getDirectory(pkgName).then(dir =>
      this.app.path(dir, `package.json`),
    )
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import<T extends string>(signifier: T, context?: string) {
    if (signifier in this.resolved) {
      const m = await import(get(this.resolved, [signifier]))
      return m?.default ?? m
    }

    try {
      const path = await this.resolve(signifier, context)
      const result = await import(path)
      logger.scope(`module`).info(`imported`, signifier)
      return result?.default ?? result
    } catch (error) {
      throw new ImportError(`could not import ${signifier}`, {
        props: {
          details: `Could not import ${signifier}`,
          origin: error,
        },
      })
    }
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
   * Resolve a module path from its signifier
   */
  @bind
  public async resolve(
    signifier: string,
    context?: string,
  ): Promise<string> {
    let errors = []

    if (signifier in this.resolved) {
      logger
        .scope(`module`)
        .info(`[cache hit] ${signifier} => ${this.resolved[signifier]}`)

      return get(this.resolved, [signifier])
    }

    logger.scope(`module`).info(`resolving`, signifier)

    try {
      const path = await resolve(signifier, this.makeContextURL())
      set(this.resolved, [signifier], normalize(fileURLToPath(path)))

      logger
        .scope(`module`)
        .info(
          `[cache miss]`,
          `resolved ${signifier} to ${get(this.resolved, [signifier])}`,
        )

      return get(this.resolved, [signifier])
    } catch (err) {
      errors.push(err.toString())
    }

    try {
      const path = await resolve(signifier, this.makeContextURL())
      set(this.resolved, [signifier], normalize(fileURLToPath(path)))
      logger
        .scope(`module`)
        .info(
          `[cache miss]`,
          `resolved ${signifier} to ${get(this.resolved, [signifier])}`,
        )

      return get(this.resolved, [signifier])
    } catch (err) {
      errors.push(err.toString())
    }

    errors.push(`Could not resolve ${signifier} from ${context}`)

    throw new ImportError(`could not resolve ${signifier}`, {
      cause: errors.reverse().join(`\n`),
    })
  }
}
