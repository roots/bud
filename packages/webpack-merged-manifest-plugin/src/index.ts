import Webpack from 'webpack'
import fs from 'fs-extra'
import path from 'path'
import {format} from 'prettier'
import type {Extension} from '@roots/bud-typings'
import type {Output as Entrypoints} from '@roots/entrypoints-webpack-plugin'

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
   * Output filename
   */
  public file: string

  /**
   * Output filepath
   */
  public path: string

  /**
   * Entrypoints filename
   */
  public entrypointsName: string

  /**
   * Externals filename
   */
  public externalsName: string

  /**
   * Class constructor
   */
  public constructor(
    [
      entrypointsPlugin,
      externalsPlugin,
    ]: Array<Extension.Controller>,
    file = 'entrypoints.json',
  ) {
    this.file = file

    this.entrypointsName = entrypointsPlugin.get('name')
    this.externalsName = externalsPlugin.get('name')

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
   * Webpack compilationHook: done
   */
  public async done(
    _compilation,
    callback,
  ): Promise<CallableFunction> {
    /**
     * Callback early if a required manifest is missing.
     */
    if (!this.isBuildable()) {
      return callback()
    }

    try {
      /**
       * Read manifests.
       */
      const entrypointsManifest = await this.manifestContent(
        this.entrypointsName,
      )

      const wordpressManifest = await this.manifestContent(
        this.externalsName,
      )

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
       * Remove merged manifests.
       */
      await fs.remove(this.manifestPath(this.externalsName))
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
      this.manifestExists(this.externalsName)
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
  ): Promise<Entrypoints> {
    return await fs.readJson(this.manifestPath(file))
  }
}

export {MergedManifestWebpackPlugin as default}
