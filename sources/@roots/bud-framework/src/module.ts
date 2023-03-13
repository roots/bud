import {createRequire} from 'node:module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {bind} from '@roots/bud-support/decorators'
import {resolve} from '@roots/bud-support/import-meta-resolve'

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
   * Unresolvable signifiers
   */
  public unresolvable: Array<string> = []

  /**
   * Resolved signifiers cache
   */
  public resolved: {
    [signifier: string]: string
  } = {}

  /**
   * Resolved modules cache
   */
  public modules: {
    [signifier: string]: any
  } = {}

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
   * Get `package.json` absolute path from a module signifier
   */
  @bind
  public async getDirectory(signifier: string, maybeContext?: string) {
    return await this.resolve(signifier, maybeContext)
      .then(path => {
        if (path === false) {
          const error = new Error(`could not resolve ${signifier}`)
          error.name = `bud.module.getDirectory: unresolvable module signifier`
          throw error
        }

        return relative(
          maybeContext ?? this.app.root.context.basedir,
          path,
        )
      })
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
    maybeContext?: string | URL,
  ): Promise<string | false> {
    if (this.unresolvable.includes(signifier)) return false
    if (this.resolved[signifier]) return this.resolved[signifier]

    const normalizeModulePath = (str: string) =>
      normalize(fileURLToPath(str))

    try {
      const resolved = await resolve(
        signifier,
        this.makeContextURL() as unknown as string,
      )

      if (resolved) {
        this.resolved[signifier] = normalizeModulePath(resolved)
        return this.resolved[signifier]
      }
    } catch (err) {
      this.logger.error(
        `could not resolve ${signifier}`,
        err.name,
        err.message,
      )
    }

    if (!maybeContext) return false

    try {
      const resolved = await resolve(
        signifier,
        this.makeContextURL(maybeContext) as unknown as string,
      )

      if (resolved) {
        this.resolved[signifier] = normalizeModulePath(resolved)
        return this.resolved[signifier]
      }
    } catch (err) {
      this.logger.error(
        `could not resolve ${signifier} from ${maybeContext}`,
        err.name,
        err.message,
      )
    }

    return false
  }

  /**
   * Import a module from its signifier
   */
  @bind
  public async import<T = any>(
    signifier: string,
    maybeContext?: string | URL,
  ): Promise<T | false> {
    if (this.unresolvable.includes(signifier)) return false
    if (this.modules[signifier]) return this.modules[signifier] as T

    try {
      const path = await this.resolve(signifier, maybeContext)
      if (!path) throw Error

      const source = await import(path)
      if (!source) throw Error

      this.modules[signifier] = source?.default ?? source
      return this.modules[signifier] as T
    } catch (error) {}

    return false
  }

  /**
   * Make context URL
   *
   * @param context  - context directory
   * @returns
   */
  @bind
  protected makeContextURL(context?: string | URL): URL {
    if (!context) return pathToFileURL(this.app.root.path(`package.json`))
    return context instanceof URL ? context : pathToFileURL(context)
  }
}
