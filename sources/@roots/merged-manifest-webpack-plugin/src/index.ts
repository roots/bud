// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

import path from 'node:path'

import fs from 'fs-jetpack'
import {bind} from 'helpful-decorators'
import type {Compiler, Stats} from 'webpack'

/**
 * Merged Manifest Webpack Plugin
 */
export default class MergedManifestWebpackPlugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: `MergedManifestPlugin`,
  }

  /**
   * Directory where the manifest will be written.
   */
  public dir: string

  /**
   * Output file
   */
  public file = `entrypoints.json`

  /**
   * Entrypoints manifest
   */
  public entrypointsName = `entrypoints.json`

  /**
   * WordPress manifest
   */
  public wordpressName = `wordpress.json`

  /**
   * Plugin constructor
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
   */
  @bind
  public apply(compiler: Compiler): void {
    this.dir = compiler.options.output.path

    compiler.hooks.done.tapAsync(this.plugin, this.done)
  }

  /**
   */
  @bind
  public async done(_stats: Stats, callback): Promise<CallableFunction> {
    // Missing manifests
    if (!this.isBuildable()) return callback()

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
      await fs.writeAsync(
        this.manifestPath(this.file),
        this.format(
          Object.entries(entrypointsManifest).reduce(
            (acc, [key, value]) => {
              return {
                ...acc,
                [key]: {
                  ...value,
                  ...{dependencies: wordpressManifest[key]},
                },
              }
            },
            {},
          ),
        ),
      )

      /**
       * Remove wordpress.json manifest.
       */
      await fs.removeAsync(this.manifestPath(this.wordpressName))
    } catch (err) {
      throw new Error(err)
    }

    return callback()
  }

  /**
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
   */
  @bind
  public isBuildable(): boolean {
    return (
      this.manifestExists(this.entrypointsName) &&
      this.manifestExists(this.wordpressName)
    )
  }

  /**
   */
  @bind
  public manifestPath(file: string): string {
    return path.resolve(this.dir, file)
  }

  /**
   */
  @bind
  public manifestExists(file: string): boolean {
    return !!fs.exists(this.manifestPath(file))
  }

  /**
   */
  @bind
  public async manifestContent(file: string): Promise<any> {
    return await fs.readAsync(this.manifestPath(file), `json`)
  }
}
