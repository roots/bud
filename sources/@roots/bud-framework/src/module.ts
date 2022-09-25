import {bind, memo} from '@roots/bud-support/decorators'
import {resolve} from 'import-meta-resolve'
import {createRequire} from 'module'
import {join, normalize, relative} from 'node:path'
import type {Signale} from 'signale'
import {fileURLToPath, pathToFileURL} from 'url'

import type {Bud} from './bud'

/**
 * Module resolver
 *
 * @public
 */
export class Module {
  /**
   * Node require
   *
   * @public
   */
  public require: NodeRequire

  public logger: Signale

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {
    this.require = createRequire(
      this.makeContextURL(this.app.root.context.basedir),
    )

    this.logger = this.app.logger.instance.scope(
      ...this.app.logger.scope,
      `module`,
    )
  }

  /**
   * Get `package.json` absolute path from a module signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async getDirectory(signifier: string, parent?: string) {
    return await this.resolve(signifier, parent)
      .then(path =>
        relative(parent ?? this.app.root.context.basedir, path),
      )
      .then(path => path.split(signifier).shift())
      .then(path => this.app.path(path as any, signifier))
  }

  /**
   * Get `package.json` absolute path from a module signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async getManifestPath(pkgName: string) {
    return await this.getDirectory(pkgName).then(dir =>
      join(dir, `package.json`),
    )
  }

  /**
   * Read `package.json` manifest from a module signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async readManifest(signifier: string) {
    return await this.getManifestPath(signifier).then(async path => {
      this.logger.log(signifier, `manifest resolved to`, path)

      return await this.app.json.read(path)
    })
  }

  /**
   * Resolve a module path from its signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async resolve(
    signifier: string,
    context?: string | URL,
  ): Promise<string> {
    try {
      const resolvedPath = await resolve(
        signifier,
        this.makeContextURL(context) as unknown as string,
      )
      this.app.success(`resolved`, signifier)
      return normalize(fileURLToPath(resolvedPath))
    } catch (err) {
      this.logger.info(
        signifier,
        `not resolvable`,
        `(context: ${context})`,
      )
    }
  }

  /**
   * Import a module from its signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async import<T = any>(
    signifier: string,
    context?: URL | URL | string,
  ): Promise<T> {
    try {
      const modulePath = await this.resolve(signifier, context)
      const result = await import(modulePath)
      this.logger.success(`imported`, signifier, `from`, modulePath)
      return result?.default ?? result
    } catch (err) {
      this.logger.fatal(
        new Error(`Fatal error importing ${signifier}\n${err}`),
      )
      throw err
    }
  }

  /**
   * Import a module from its signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async tryImport<T = any>(
    signifier: string,
    context?: URL | URL | string,
  ): Promise<T> | undefined | null {
    try {
      const modulePath = await this.resolve(signifier, context)
      const result = await import(modulePath)
      this.logger.success(`imported`, signifier, `from`, modulePath)
      return result?.default ?? result
    } catch (err) {
      this.logger.info(`Error importing`, signifier, err)
    }
  }

  /**
   * Make context URL
   *
   * @param context  - context directory
   * @returns
   */
  @bind
  protected makeContextURL(context?: string | URL): URL {
    context = context ?? this.app.root.path(`package.json`)

    return context instanceof URL
      ? context
      : pathToFileURL(
          !context ? this.app.root.path(`package.json`) : context,
        )
  }
}
