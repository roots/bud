import Webpack from 'webpack'
import fs from 'fs-extra'
import path from 'path'
import {format} from 'prettier'
import type {EntrySchema} from '@roots/entrypoints-webpack-plugin'

class MergedManifestWebpackPlugin {
  /**
   * Plugin ident.
   */
  public plugin = {
    name: 'MergedManifestPlugin',
  }

  /**
   * Output dir
   */
  public dir: string

  /**
   * Output filepath
   */
  public path: string

  /**
   * Output filename
   */
  public file = 'entrypoints.json'

  /**
   * Entrypoints filename
   */
  public entrypointsName = 'entrypoints.json'

  /**
   * Externals filename
   */
  public wordpressName = 'wordpress.json'

  /**
   * Class constructor
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

    this.done = this.done.bind(this)
    this.format = this.format.bind(this)
    this.isBuildable = this.isBuildable.bind(this)

    this.manifestPath = this.manifestPath.bind(this)
    this.manifestExists = this.manifestExists.bind(this)
    this.manifestContent = this.manifestContent.bind(this)
  }

  /**
   * Webpack apply plugin
   */
  public apply(compiler: Webpack.Compiler): void {
    this.dir = compiler.options.output.path
    this.path = path.resolve(this.dir, this.file)

    compiler.hooks.done.tapAsync(this.plugin, this.done)
  }

  /**
   * Webpack.Compilation.CompilerHooks['done']['tapAsync']
   */
  public done = async function (
    _compilation,
    callback,
  ): Promise<CallableFunction> {
    /**
     * Callback early if a required manifest is missing.
     */
    if (!this.isBuildable()) {
      console.error('is not buildable')
      process.exit()
    }

    /**
     * Read manifests.
     */
    try {
      const entrypointsManifest: {
        [key: string]: {js: string; css: string}
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
      // await fs.remove(this.manifestPath(this.wordpressName))
    } catch (err) {
      console.error(err)
    }

    return callback()
  }

  /**
   * Format manifest.
   */
  public format(object: {
    [key: string]: {
      [key: string]: string[]
    }
  }): string {
    return format(JSON.stringify(object), {
      parser: 'json',
      printWidth: 40,
    })
  }

  /**
   * Return true if all manifests are present.
   */
  public isBuildable(): boolean {
    return (
      this.manifestExists(this.entrypointsName) &&
      this.manifestExists(this.wordpressName)
    )
  }

  /**
   * Return full path of manifest.
   */
  public manifestPath(file: string): string {
    return path.resolve(this.dir, file)
  }

  /**
   * Return true if manifest is present.
   */
  public manifestExists(file: string): boolean {
    return fs.existsSync(this.manifestPath(file))
  }

  /**
   * Return manifest contents as an object.
   */
  public async manifestContent(
    file: string,
  ): Promise<EntrySchema> {
    return await fs.readJson(this.manifestPath(file))
  }
}

export {MergedManifestWebpackPlugin as default}
