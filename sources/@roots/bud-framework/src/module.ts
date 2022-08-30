import {bind, memo} from 'helpful-decorators'
import {resolve} from 'import-meta-resolve'
import {createRequire} from 'module'
import {join, normalize, relative} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'url'

import type {Bud} from './bud.js'

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

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {
    this.require = createRequire(this.app.root.context.basedir)
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
      this.app.log(signifier, `manifest resolved to`, path)

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
    context = this.makeContextURL(context)

    try {
      const resolvedPath = await resolve(
        signifier,
        context as unknown as string,
      )
      return normalize(fileURLToPath(resolvedPath))
    } catch (err) {
      this.app.info(signifier, `not resolvable`, `(context: ${context})`)
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
    context?: URL | string,
  ): Promise<T> {
    context = this.makeContextURL(context)

    const modulePath = await this.resolve(signifier, context)
    const result = await import(modulePath)
    if (!result) {
      this.app.error(signifier, `not found`)
      return {} as T
    }

    return result?.default ?? result
  }

  @bind
  private makeContextURL(context?: string | URL) {
    context = context ?? this.app.root.path(`package.json`)

    return context instanceof URL
      ? context
      : pathToFileURL(
          !context ? this.app.root.path(`package.json`) : context,
        )
  }
}
