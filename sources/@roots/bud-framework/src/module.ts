import {createRequire} from 'node:module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators/bind'
import {ImportError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import args from '@roots/bud-support/utilities/args'
import logger from '@roots/bud-support/utilities/logger'
import * as paths from '@roots/bud-support/utilities/paths'
import chalk from 'chalk'

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

  public override get logger() {
    if (this.app?.context?.logger && `scope` in this.app.context.logger)
      return this.app.context.logger.scope(this.app.label, `module`)

    return logger.scope(this.app.label, `module`)
  }

  /**
   * {@link Service.init}
   */
  @bind
  public override async bootstrap(bud: Bud) {
    this.require = createRequire(this.makeContextURL(bud.context.basedir))

    if (this.cacheEnabled && !!(await bud.fs.exists(this.cacheLocation))) {
      this.logger.info(`cache is enabled and cached resolutions exist`)

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
      this.logger.info(signifier, `manifest resolved to`, path)
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
      this.logger.info(
        chalk.green(`[cache hit]`),
        chalk.green(signifier),
        figures.arrowRight,
        chalk.blue(
          relative(this.app.context.basedir, this.resolved[signifier]),
        ),
      )

      return this.resolved[signifier]
    }

    this.logger.info(`resolving ${signifier} from ${context}`)

    const resolver = async (
      signifier: string,
      context: string,
    ): Promise<string> => {
      try {
        const path = await resolve(signifier, context)
        const normal = normalize(fileURLToPath(path))
        this.resolved[signifier] = normal

        this.logger.log(
          chalk.red(`[cache miss]`),
          chalk.green(signifier),
          figures.arrowRight,
          chalk.blue(
            relative(this.app.context.basedir, this.resolved[signifier]),
          ),
        )

        return this.resolved[signifier]
      } catch (err) {
        errors.push(err.toString())
      }
    }

    const resolved = await resolver(signifier, this.makeContextURL())
    if (resolved) return resolved

    if (context) {
      const resolved = await resolver(
        signifier,
        this.makeContextURL(context),
      )
      if (resolved) return resolved
    }

    if (!this.resolved[signifier]) {
      errors.push(`Could not resolve ${signifier} from ${context}`)
      throw new ImportError(`could not resolve ${signifier}`, {
        cause: errors.reverse().join(`\n`),
      })
    }
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
      this.logger.info(`imported ${signifier}`)
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
