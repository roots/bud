import {boundMethod as bind} from 'autobind-decorator'
import {uniq} from 'lodash'
import type * as Webpack from 'webpack'
import {sources} from 'webpack'

interface EntrypointsPlugin {
  name: string
  assets: Entry
}

interface Entry {
  [entry: string]: {
    [type: string]: string[]
  }
}

interface Options {
  name?: string
  type?: 'array' | 'object'
  publicPath?: string
  outputPath?: string
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
 * @sealed
 */
export class EntrypointsWebpackPlugin
  implements EntrypointsPlugin
{
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
        Object.assign(this, {[prop]: options[prop]})
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
   * @decorator `@bind`
   */
  @bind
  public processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointFiles(entry).map(({key, file}) => {
        !file.includes('hot-update') &&
          this.addToManifest({
            key,
            entry: entry.name,
            file,
          })
      })
    })

    this.compilation.assets[this.name] = new sources.RawSource(
      JSON.stringify({...this.assets}),
      true,
    )
  }

  /**
   * Adds an entry to the manifest
   *
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
