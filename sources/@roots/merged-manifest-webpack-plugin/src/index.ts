// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

import * as fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import * as path from 'path'
import * as Webpack from 'webpack'

/**
 * Merged Manifest Webpack Plugin
 *
 * @public
 */
export class MergedManifestWebpackPlugin {
  /**
   * Plugin ident
   *
   * @public
   */
  public plugin = {
    name: 'MergedManifestPlugin',
  }

  /**
   * Directory where the manifest will be written.
   *
   * @public
   */
  public dir: string

  /**
   * @public
   */
  public path: string

  /**
   * @public
   */
  public file = 'entrypoints.json'

  /**
   * @public
   */
  public entrypointsName = 'entrypoints.json'

  /**
   * @public
   */
  public wordpressName = 'wordpress.json'

  /**
   * Plugin constructor
   *
   * @public
   */
  public constructor(options?: {
    entrypointsName?: string
    wordpressName?: string
    file?: string
  }) {
    options &&
      Object.keys(options).map(prop => {
        Object.assign(this, {[prop]: options[prop]})
      })
  }

  /**
   * @public
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    this.dir = compiler.options.output.path
    this.path = path.resolve(this.dir, this.file)

    compiler.hooks.done.tapAsync(this.plugin, this.done)
  }

  /**
   * @public
   */
  @bind
  public async done(_compilation, callback): Promise<CallableFunction> {
    if (!this.isBuildable()) {
      return callback()
    }

    /**
     * Read manifests.
     */
    try {
      const entrypointsManifest: {
        [entry: string]: {
          js: {
            [key: string]: string
          }
          css: {
            [key: string]: string
          }
        }
      } = await this.manifestContent(this.entrypointsName)

      const wordpressManifest: {
        [key: string]: Array<string>
      } = await this.manifestContent(this.wordpressName)

      /**
       * Reduce aggregate manifest and write to file.
       */
      await fs.outputFile(
        this.path,
        this.format(
          Object.entries(entrypointsManifest).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: {
                ...value,
                ...{dependencies: wordpressManifest[key]},
              },
            }),
            {},
          ),
        ),
      )

      /**
       * Remove wordpress.json manifest.
       */
      await fs.remove(this.manifestPath(this.wordpressName))
    } catch (err) {
      throw new Error(err)
    }

    return callback()
  }

  /**
   * @public
   */
  @bind
  public format(object: {
    [key: string]: {
      [key: string]: string[]
    }
  }): string {
    return JSON.stringify(object, null, 2)
  }

  /**
   * @public
   */
  @bind
  public isBuildable(): boolean {
    return (
      this.manifestExists(this.entrypointsName) &&
      this.manifestExists(this.wordpressName)
    )
  }

  /**
   * @public
   */
  @bind
  public manifestPath(file: string): string {
    return path.resolve(this.dir, file)
  }

  /**
   * @public
   */
  @bind
  public manifestExists(file: string): boolean {
    return fs.existsSync(this.manifestPath(file))
  }

  /**
   * @public
   */
  @bind
  public async manifestContent(file: string): Promise<any> {
    return await fs.readJson(this.manifestPath(file))
  }
}
