import {bind} from 'helpful-decorators'
import {resolve} from 'import-meta-resolve'
import {join, relative} from 'node:path/posix'

import {Bud} from './bud'

/**
 * Module resolver
 *
 * @public
 */
export class Module {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {}

  /**
   * Get `package.json` absolute path from a module signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getManifestPath(pkgName: string) {
    return await this.resolve(pkgName)
      .then(path => path.replace('file://', ''))
      .then(path => relative(this.app.context.projectDir, path))
      .then(path => path.split(pkgName).shift())
      .then(path => join(path, pkgName, 'package.json'))
  }

  /**
   * Read `package.json` manifest from a module signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
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
  public async resolve(
    signifier: string,
    parent?: string,
  ): Promise<string> {
    const resolvedPath = await resolve(
      signifier,
      parent ? `file://${parent}` : import.meta.url,
    )

    return resolvedPath.replace('file://', '')
  }

  /**
   * Import a module from its signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import<T = any>(importPath: string): Promise<T> {
    const resolvedPath = await this.resolve(importPath)
    if (!resolvedPath) return

    return await import(resolvedPath)
  }
}
