import {boundMethod as bind} from 'autobind-decorator'
import {uniq} from 'lodash'
import type * as Webpack from 'webpack'
import {sources} from 'webpack'

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
class EntrypointsWebpackPlugin implements Entrypoints.Plugin {
  /**
   * Plugin related properties
   */
  protected plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Artifact filename
   */
  public name: string = 'entrypoints.json'

  /**
   * Webpack compiler instance
   */
  public compiler: Webpack.Compiler

  /**
   * Webpack compilation instance
   */
  public compilation: Webpack.Compilation

  /**
   * Project publicPath
   */
  public publicPath: string

  /**
   * Collected assets
   */
  public assets: Entrypoints.Entry

  /**
   * Class constructor
   */
  public constructor(options?: Entrypoints.Options) {
    options &&
      Object.keys(options).map(prop => {
        Object.assign(this, {[prop]: options[prop]})
      })
  }

  /**
   * Webpack plugin API's `apply` hook
   *
   * @decorator `@bind`
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    this.assets = {}

    this.compiler = compiler
    this.publicPath =
      this.publicPath ||
      (this.compiler.options.output.publicPath as string)

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
      this.getEntrypointFiles(entry).map(file => {
        !file.includes('hot-update') &&
          this.addToManifest({
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
  public addToManifest({entry, file}) {
    const type = file.split('.').pop()

    if (!this.assets[entry]) {
      this.assets[entry] = {
        [type]: null,
      }
    }

    this.assets[entry] = {
      ...this.assets[entry],
      [type]: uniq([
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
  }): string[] {
    const files = []
    for (const chunk of entry.chunks) {
      Array.from(chunk.files).map(file => {
        files.push(file)
      })
    }

    return files
  }
}

export {EntrypointsWebpackPlugin}
