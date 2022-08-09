import {bind, memo} from 'helpful-decorators'
import {resolve} from 'import-meta-resolve'
import {createRequire} from 'module'
import {join, normalize, relative} from 'node:path'

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
      .then(path => path.replace('file://', ''))
      .then(this.require.resolve)
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
      join(dir, 'package.json'),
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
    parent?: string,
  ): Promise<string> {
    const context =
      parent ?? `file://${this.app.root.path('./package.json')}`

    try {
      const resolvedPath = await resolve(signifier, context)
      const normalized = normalize(
        resolvedPath.replace('file://', '').replace(/%20/g, ' '),
      )
      return normalized
    } catch (err) {
      this.app.info(signifier, 'not resolvable', `(context: ${context})`)
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
    context?: string,
  ): Promise<T> {
    if (!context)
      context = `file://${this.app.root.path('./package.json')}`
    const modulePath = await this.resolve(signifier, context)
    const result = await import(modulePath)
    if (!result) {
      this.app.error(signifier, 'not found')
      return {} as T
    }

    return result?.default ?? result
  }
}
