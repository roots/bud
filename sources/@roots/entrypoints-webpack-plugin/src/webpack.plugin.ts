import {boundMethod as bind} from 'autobind-decorator'
import {uniq} from 'lodash'
import type * as Webpack from 'webpack'
import {sources} from 'webpack'

import {InlineEmitter} from './inline.emitter'

/**
 * Entrypoints
 *
 * @public
 */
export interface Entry extends Record<string, unknown> {
  [entry: string]: {
    [type: string]: string[]
  }
}

/**
 * EntrypointsWebpackPlugin options
 *
 * @public
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
   *
   * @public
   */
  emitHtml?: boolean
}

/**
 * Produces `entrypoints.json` artifact with compiled assets broken down
 * by entrypoint and then filetype.
 *
 * @example
 * ```
 * import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'
 *
 * const config = {
 *   plugins: [new EntrypointsWebpackPlugin()]
 * }
 * ```
 *
 * @public
 */
export class EntrypointsWebpackPlugin {
  /**
   * Plugin compiler ident
   *
   * @public
   */
  protected plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Artifact filename
   *
   * @public
   */
  public name: string = 'entrypoints.json'

  /**
   * Entrypoints type.
   *
   * Object type will key files by chunk name
   *
   * @public
   */
  public type: 'array' | 'object' = 'array'

  /**
   * Webpack compiler instance
   *
   * @public
   */
  public compiler: Webpack.Compiler

  /**
   * Webpack compilation instance
   *
   * @public
   */
  public compilation: Webpack.Compilation

  /**
   * Emit html
   *
   * @public
   */
  public emitHtml: boolean = false

  /**
   * Project publicPath
   *
   * @public
   */
  public publicPath: string

  /**
   * Collected assets
   *
   * @public
   */
  public assets: Entry

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(options?: Options) {
    options &&
      Object.keys(options).map(prop => {
        this[prop] = options[prop]
      })
  }

  /**
   * Webpack plugin API's `apply` hook
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    this.assets = {}

    this.compiler = compiler
    this.publicPath =
      this.publicPath ??
      (this.compiler.options.output.publicPath as string) ??
      ''

    this.publicPath = this.publicPath.replace('auto', '')

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
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry)
        .filter(({file}) => !file.includes('hot-update'))
        .map(({key, file}) => {
          this.addToManifest({key, entry: entry.name, file})
        })
    })

    this.emitHtml &&
      new InlineEmitter(
        this.compilation,
        this.assets,
        this.publicPath,
      ).emitHtmlTags()

    Object.assign(this.compilation.assets, {
      [this.name]: new sources.RawSource(
        JSON.stringify(this.assets),
        true,
      ),
    })
  }

  /**
   * Adds an entry to the manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public addToManifest({key = null, entry, file}) {
    const type = file.split('.').pop()

    if (!this.assets[entry]) {
      this.assets[entry] = {
        [type]: null,
      }
    }

    this.assets[entry] = {
      ...this.assets[entry],
      [type]:
        this.type === 'object' && key
          ? {
              ...(this.assets[entry][type] ?? {}),
              [key]: this.publicPath.concat(file),
            }
          : uniq([
              ...(this.assets[entry][type] ?? []),
              this.publicPath.concat(file),
            ]),
    }
  }

  /**
   * Get assets from an entrypoint
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getEntrypointFiles(entry: {
    chunks: Webpack.Chunk[]
  }): {[key: string]: string}[] {
    const files = []
    for (const chunk of entry.chunks) {
      Array.from(chunk.files).map(file => {
        files.push({
          key: chunk.name,
          file,
        })
      })
    }

    return files
  }
}
