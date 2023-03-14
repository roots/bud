import {bind} from 'helpful-decorators'
import uniq from 'lodash/uniq.js'
import Webpack from 'webpack'

import {HtmlEmitter} from './html.emitter.js'

/**
 * Entrypoints
 */
export interface Entry extends Record<string, unknown> {
  [entry: string]: {
    [type: string]: string[]
  }
}

/**
 * EntrypointsWebpackPlugin options
 */
export interface Options {
  /**
   * Name of the file to emit (default: `entrypoints.json`)
   */
  name?: string

  /**
   * Emit entrypoints as an array or an object (default: `array`)
   */
  type?: 'array' | 'object'

  /**
   * Override the public path (default is from webpack)
   */
  publicPath?: string

  /**
   * Path to emit entrypoints.json
   */
  outputPath?: string

  /**
   * Emit html with inlined runtime, script and style tags
   */
  emitHtml?: boolean
}

/**
 * Produces `entrypoints.json` artifact with compiled assets broken down
 * by entrypoint and then filetype.
 *
 * @example
 * ```js
 * import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'
 *
 * const config = {
 *   plugins: [new EntrypointsWebpackPlugin()]
 * }
 * ```
 */
export class EntrypointsWebpackPlugin {
  /**
   * Plugin compiler ident
   */
  protected plugin = {
    name: `EntrypointsManifestPlugin`,
    stage: Infinity,
  }

  /**
   * Artifact filename
   */
  public name: string = `entrypoints.json`

  /**
   * Webpack compiler instance
   */
  public compiler: Webpack.Compiler

  /**
   * Webpack compilation instance
   */
  public compilation: Webpack.Compilation

  /**
   * Collected assets
   */
  public assets: Entry

  /**
   * Class constructor
   */
  public constructor(public options: Options) {}

  /**
   * Webpack plugin API's `apply` hook
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    this.assets = {}

    this.compiler = compiler

    this.options.publicPath =
      this.options.publicPath ??
      (this.compiler.options.output.publicPath as string) ??
      ``

    this.options.publicPath = this.options.publicPath.replace(`auto`, ``)

    this.compiler.hooks.thisCompilation.tap(
      this.plugin,
      (compilation: Webpack.Compilation) => {
        this.compilation = compilation

        this.compilation.hooks.processAssets.tap(
          {...this.plugin, additionalAssets: true},
          this.processAssets,
        )
      },
    )
  }

  /**
   * Runs through each entrypoint entry and adds to the
   * manifest
   */
  @bind
  public processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry)
        .filter(({file}) => !file.includes(`hot-update`))
        .map(({key, file}) => {
          this.addToManifest({key, entry: entry.name, file})
        })
    })

    this.options.emitHtml &&
      new HtmlEmitter(
        this.compilation,
        this.assets,
        this.options.publicPath,
      ).emit()

    Object.assign(this.compilation.assets, {
      [this.name]: new Webpack.sources.RawSource(
        JSON.stringify(this.assets),
        true,
      ),
    })
  }

  /**
   * Adds an entry to the manifest
   */
  @bind
  public addToManifest({
    key = null,
    entry,
    file,
  }: {
    key?: string
    entry: string
    file: any
  }) {
    const type = file.split(`.`).pop()

    if (!this.assets[entry]) {
      this.assets[entry] = {[type]: null}
    }

    this.assets[entry] = {
      ...this.assets[entry],
      [type]:
        this.options.type === `object` && key
          ? {
              ...(this.assets[entry][type] ?? {}),
              [key]: this.options.publicPath.concat(file),
            }
          : uniq([
              ...(this.assets[entry][type] ?? []),
              this.options.publicPath.concat(file),
            ]),
    }
  }

  /**
   * Get assets from an entrypoint
   */
  @bind
  public getEntrypointFiles(entry: {
    chunks: Webpack.Chunk[]
  }): {[key: string]: string}[] {
    const files = []
    for (const chunk of entry.chunks) {
      Array.from(chunk.files).map(file => {
        files.push({key: chunk.name, file})
      })
    }

    return files
  }
}
