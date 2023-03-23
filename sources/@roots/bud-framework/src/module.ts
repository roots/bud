import {createRequire} from 'node:module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators'
import {resolve} from '@roots/bud-support/import-meta-resolve'
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
  public cacheLocation: string

  /**
   * Cache enabled
   */
  public cacheEnabled: boolean

  /**
   * Cache exists
   */
  public cacheValid: boolean

  /**
   * Class constructor
   */
  public constructor(args: () => Bud) {
    super(args)

    this.require = createRequire(
      this.makeContextURL(this.app.root.context.basedir),
    )
  }

  /**
   * {@link Service.init}
   */
  @bind
  public override async init(bud: Bud) {
    const isForced = (bud as any).context.args?.force === true
    const isEnabled = (bud as any).context.args?.cache !== false
    this.cacheEnabled = !isForced && isEnabled
    this.cacheLocation = join(paths.get().storage, `resolutions.yml`)

    const cacheExists = !!(await bud.fs.exists(this.cacheLocation))

    if (this.cacheEnabled && cacheExists) {
      try {
        const data = await bud.fs.read(this.cacheLocation)
        if (data.version && data.version === bud.context?.bud?.version) {
          this.resolved = data.resolutions
          this.cacheValid = true
        } else {
          this.cacheValid = false
        }
      } catch (e) {
        this.cacheValid = false
      }
    }
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, context?: string) {
    return await this.resolve(signifier, context)
      .then(path =>
        relative(context ?? this.app.root.context.basedir, path),
      )
      .then(path => path.split(signifier).shift())
      .then(path => this.app.root.path(path as any, signifier))
  }

  /**
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getManifestPath(pkgName: string) {
    return await this.getDirectory(pkgName).then(dir =>
      join(dir, `package.json`),
    )
  }

  /**
   * Read `package.json` manifest from a module signifier
   */
  @bind
  public async readManifest(signifier: string) {
    return await this.getManifestPath(signifier).then(async path => {
      this.logger.info(signifier, `manifest resolved to`, path)
      return await this.app.fs.json.read(path)
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
    if (this.resolved[signifier]) {
      this.logger.info(
        chalk.dim(
          `[cache hit]`,
          `resolved ${signifier} to ${this.app.root.relPath(
            this.resolved[signifier],
          )}`,
        ),
      )

      return this.resolved[signifier]
    }

    let errors = []

    try {
      const path = await resolve(signifier, this.makeContextURL())
      const normal = normalize(fileURLToPath(path))
      this.logger.info(
        chalk.dim(
          `[cache miss]`,
          `resolved ${signifier} to ${this.app.root.relPath(normal)}`,
        ),
      )
      this.resolved[signifier] = normal
      return this.resolved[signifier]
    } catch (err) {
      errors.push(err.toString())
    }

    try {
      const path = await resolve(signifier, this.makeContextURL(context))

      const normal = normalize(fileURLToPath(path))

      this.logger.info(
        chalk.dim(
          `[cache miss]`,
          `resolved ${signifier} to ${this.app.root.relPath(normal)}`,
        ),
      )

      this.resolved[signifier] = normal
      return this.resolved[signifier]
    } catch (err) {
      errors.push(err.toString())
    }

    errors.push(`Could not resolve ${signifier} from ${context}`)
    const error = new Error(errors.reverse().join(`\n\n`))
    error.name = `Could not resolve ${signifier}`
    throw error
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import<T = any>(
    signifier: string,
    context: string,
  ): Promise<T> {
    try {
      const modulePath = await this.resolve(signifier, context)
      const result = await import(modulePath)
      this.logger.info(chalk.dim(`imported ${signifier}`))
      return result?.default ?? result
    } catch (err) {
      const error = new Error(
        [`could not import ${signifier}`, err.toString()].join(`\n\n`),
      )
      error.name = `Module Import Error`
      throw error
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
      this.logger.info(chalk.dim(`imported ${signifier} (optional)`))
      return result?.default ?? result
    } catch (err) {
      this.logger.info(
        chalk.dim(`${signifier} could not be imported (optional)`),
        err,
      )
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
        this.app.root.path(`package.json`),
      ) as unknown as string)
    )
  }
}
