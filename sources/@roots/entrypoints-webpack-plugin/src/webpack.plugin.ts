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
   * Emit html with inlined runtime, script and style tags
   */
  emitHtml?: boolean

  /**
   * Name of the file to emit (default: `entrypoints.json`)
   */
  name?: string

  /**
   * Path to emit entrypoints.json
   */
  outputPath?: string

  /**
   * Override the public path (default is from webpack)
   */
  publicPath?: string

  /**
   * Emit entrypoints as an array or an object (default: `array`)
   */
  type?: 'array' | 'object'
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
   * Collected assets
   */
  public assets: Entry

  /**
   * Webpack compilation instance
   */
  public compilation: Webpack.Compilation

  /**
   * Webpack compiler instance
   */
  public compiler: Webpack.Compiler

  /**
   * Artifact filename
   */
  public name: string = `entrypoints.json`

  /**
   * Plugin compiler ident
   */
  protected plugin = {
    name: `EntrypointsManifestPlugin`,
    stage: Infinity,
  }

  /**
   * Class constructor
   */
  public constructor(public options: Options) {}

  /**
   * Adds an entry to the manifest
   */
  @bind
  public addToManifest({
    entry,
    file,
    key = null,
  }: {
    entry: string
    file: any
    key?: string
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
   * Get assets from an entrypoint
   */
  @bind
  public getEntrypointFiles(entry: {
    chunks: Webpack.Chunk[]
  }): {[key: string]: string}[] {
    const files = []
    for (const chunk of entry.chunks) {
      Array.from(chunk.files).map(file => {
        files.push({file, key: chunk.name})
      })
    }

    return files
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
        .map(({file, key}) => {
          this.addToManifest({entry: entry.name, file, key})
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
}
