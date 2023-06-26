import type {
  CompilationHooks,
  Entrypoints,
  Options,
} from '@roots/entrypoints-webpack-plugin'

import {bind} from 'helpful-decorators'
import uniq from 'lodash/uniq.js'
import {SyncHook, SyncWaterfallHook} from 'tapable'
import Webpack from 'webpack'

import {HtmlEmitter} from './html.emitter.js'

/**
 * {@link https://webpack.js.org/api/plugins/#custom-hooks}
 */
const hookMap = new WeakMap<Webpack.Compilation, CompilationHooks>()

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
  public entrypoints: Entrypoints

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
  public constructor(public options: Options) {
    if (!this.options.type) {
      this.options.type = `object`
    }

    if (!this.options.publicPath || this.options.publicPath === `auto`) {
      this.options.publicPath = ``
    }

    if (!this.options.name) {
      this.options.name = `entrypoints.json`
    }
  }

  /**
   * Compilation hooks
   *
   * @param compilation
   * @returns
   */
  public static getCompilationHooks(
    compilation: Webpack.Compilation,
  ): CompilationHooks {
    let hooks: CompilationHooks = hookMap.get(compilation)

    if (hooks === undefined) {
      hooks = {
        compilation: new SyncHook([`compilation`]),
        entrypoints: new SyncWaterfallHook([`entrypoints`]),
      }
      hookMap.set(compilation, hooks)
    }

    return hooks
  }

  @bind
  public addToManifest({
    ident,
    path,
    type,
  }: {
    ident: string
    path: string
    type: string
  }) {
    if (this.options.type === `object`) {
      if (!this.entrypoints[ident]) this.entrypoints[ident] = {}

      if (!this.entrypoints[ident][type])
        this.entrypoints[ident][type] = []

      this.entrypoints[ident][type] = uniq([
        ...this.entrypoints[ident][type],
        path,
      ])
    } else {
      if (!this.entrypoints[ident]) this.entrypoints[ident] = []
      this.entrypoints[ident] = uniq([...this.entrypoints[ident], path])
    }
  }

  /**
   * Webpack plugin API's `apply` hook
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.thisCompilation.tap(
      this.constructor.name,
      compilation => {
        compilation.hooks.processAssets.tapPromise(
          {
            name: this.constructor.name,
            stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
          },
          async assets => {
            const hooks =
              EntrypointsWebpackPlugin.getCompilationHooks(compilation)
            hooks.compilation.call(compilation)

            const cache = compilation.getCache(this.constructor.name)
            this.entrypoints = await cache.getPromise<Entrypoints>(
              `entrypoints`,
              null,
            )

            if (!this.entrypoints) {
              this.entrypoints = {}

              for (const entry of compilation.entrypoints.values()) {
                this.getChunkedFiles(entry.chunks).map(({file}) => {
                  const ident = entry.name
                  const path = this.options.publicPath.concat(file)
                  const type = path.split(`.`).pop()

                  this.addToManifest({ident, path, type})
                })
              }

              await cache.storePromise(
                `entrypoints`,
                null,
                this.entrypoints,
              )
            }

            this.entrypoints = hooks.entrypoints.call(this.entrypoints)

            if (this.options.emitHtml) {
              new HtmlEmitter(
                compilation,
                this.entrypoints,
                this.options.publicPath,
              ).emit()
            }

            assets[this.options.name] =
              new compiler.webpack.sources.RawSource(
                JSON.stringify(this.entrypoints, null, 2),
              )
          },
        )
      },
    )
  }

  /**
   * Get assets from an entrypoint
   */
  public getChunkedFiles(chunks: Webpack.Chunk[]) {
    const files = []

    for (const chunk of chunks) {
      Array.from(chunk.files).map(file => {
        files.push({file, ident: chunk.name})
      })
    }

    return files
  }
}
