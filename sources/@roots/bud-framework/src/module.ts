import {createRequire} from 'node:module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {ImportError} from '@roots/bud-support/errors'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import args from '@roots/bud-support/utilities/args'
import logger from '@roots/bud-support/utilities/logger'
import * as paths from '@roots/bud-support/utilities/paths'

import type {Bud} from './bud.js'
import {Service} from './service.js'

/**
 * Module resolver
 */
export class Module extends Service {
  /**
   * Node require
   */
  public require: NodeRequire

  /**
   * Resolved module cache
   */
  public resolved: Record<string, string> = {}

  /**
   * Cache location
   */
  public get cacheLocation(): string {
    return join(
      paths.get(this.app.context.basedir).storage,
      `resolutions.yml`,
    )
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
   * Cache exists
   */
  public cacheValid: boolean

  /**
   * Class constructor
   */
  public constructor(_app: () => Bud) {
    super(_app)
  }

  /**
   * {@link Service.init}
   */
  @bind
  public override async init(bud: Bud) {
    this.require = createRequire(this.makeContextURL(bud.context.basedir))

    if (this.cacheEnabled && !!(await bud.fs.exists(this.cacheLocation))) {
      logger
        .scope(`module`)
        .info(`cache is enabled and cached resolutions exist`)

      try {
        const data = await bud.fs.read(this.cacheLocation)
        if (data.version && data.version === bud.context?.bud?.version) {
          this.resolved = data.resolutions
          this.cacheValid = true
          return
        }
      } catch (e) {
        // noop
      }
    }

    this.cacheValid = false
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, context?: string) {
    return await this.resolve(signifier, context)
      .then(path => relative(context ?? this.app.context.basedir, path))
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
    if (signifier in this.resolved) {
      logger
        .scope(`module`)
        .info(
          `resolved ${signifier} to ${relative(
            this.app.context.basedir,
            this.resolved[signifier],
          )} from cache`,
        )

      return this.resolved[signifier]
    }

    logger.scope(`module`).info(`resolving ${signifier} from ${context}`)

    let errors = []

    try {
      const path = await resolve(signifier, this.makeContextURL())
      const normal = normalize(fileURLToPath(path))
      logger
        .scope(`module`)
        .info(
          `[cache miss]`,
          `resolved ${signifier} to ${relative(
            this.app.context.basedir,
            normal,
          )}`,
        )

      this.resolved[signifier] = normal
      return this.resolved[signifier]
    } catch (err) {
      errors.push(err.toString())
    }

    try {
      const path = await resolve(signifier, this.makeContextURL(context))

      const normal = normalize(fileURLToPath(path))

      logger
        .scope(`module`)
        .info(
          `[cache miss]`,
          `resolved ${signifier} to ${relative(
            this.app.context.basedir,
            normal,
          )}`,
        )

      this.resolved[signifier] = normal
      return this.resolved[signifier]
    } catch (err) {
      errors.push(err.toString())
    }

    errors.push(`Could not resolve ${signifier} from ${context}`)

    throw new ImportError(`could not resolve ${signifier}`, {
      cause: errors.reverse().join(`\n`),
    })
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import<T = any>(
    signifier: string,
    context?: string,
  ): Promise<T> {
    try {
      const modulePath = await this.resolve(signifier, context)
      const result = await import(modulePath)
      logger.scope(`module`).info(`imported ${signifier}`)
      return result?.default ?? result
    } catch (cause) {
      throw new ImportError(`could not resolve ${signifier}`, {
        props: {
          details: `Could not resolve/import ${signifier}. Context: ${context}`,
          origin: cause,
        },
      })
    }
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async tryImport<T = any>(
    signifier: string,
    context?: string,
  ): Promise<T> | undefined | null {
    try {
      const modulePath = await this.resolve(signifier, context)
      const result = await import(modulePath)
      logger.scope(`module`).info(`imported ${signifier} (optional)`)
      return result?.default ?? result
    } catch (err) {
      logger
        .scope(`module`)
        .info(`${signifier} could not be imported (optional)`, err)
    }
  }

  /**
   * Make context URL
   */
  @bind
  protected makeContextURL(context?: string): string {
    return (
      context ??
      (pathToFileURL(
        join(this.app.context.basedir, `package.json`),
      ) as unknown as string)
    )
  }
}
