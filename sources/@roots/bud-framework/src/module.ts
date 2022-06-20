import {bind, memo} from 'helpful-decorators'
import {resolve} from 'import-meta-resolve'
import {createRequire} from 'module'
import {join, relative} from 'node:path'

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
    this.app.log('projectDir', this.app.context.projectDir)
    this.app.log('process.cwd', process.cwd())
    this.require = createRequire(this.app.context.projectDir)
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
      .then(path => relative(parent ?? this.app.context.projectDir, path))
      .then(path => path.split(signifier).shift())
      .then(path => join(this.app.path(), path, signifier))
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
    try {
      const resolvedPath = await resolve(
        signifier,
        parent ? `file://${parent}` : import.meta.url,
      )

      return resolvedPath.replace('file://', '')
    } catch (err) {
      this.app.error('bud.module.resolve err', signifier, err)
    }
  }

  /**
   * Resolve CJS
   *
   * @param signifier - package name
   * @param parent - path to resolve from
   *
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async resolveCjs(signifier: string, parent?: string) {
    if (parent) {
      const require = createRequire(`file://${parent}`)
      return require.resolve(signifier)
    }

    return this.require.resolve(signifier)
  }

  /**
   * Import a module from its signifier
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @memo()
  public async import<T = any>(signifier: string): Promise<T> {
    const result = await import(signifier)
    return result?.default ?? result
  }
}
