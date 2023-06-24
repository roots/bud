import type {
  CompilationHooks,
  Options,
} from '@roots/wordpress-theme-json-webpack-plugin'
import type {Compiler, WebpackPluginInstance} from 'webpack'

import omit from 'lodash/omit.js'
import {relative} from 'node:path'
import {AsyncSeriesWaterfallHook, SyncWaterfallHook} from 'tapable'
import Webpack from 'webpack'

/**
 * {@link https://webpack.js.org/api/plugins/#custom-hooks}
 */
const hookMap = new WeakMap<Webpack.Compilation, CompilationHooks>()

/**
 * ThemeJSONWebpackPlugin
 */
export class ThemeJsonWebpackPlugin implements WebpackPluginInstance {
  /**
   * Class constructor
   *
   * @param options - Plugin options
   */
  public constructor(public options: Options) {
    if (!this.options) this.options = {path: `../theme.json`, version: 2}

    if (!this.options.__generated__)
      this.options.__generated__ = `⚠️ This file is generated. Do not edit.`
    if (!this.options.$schema)
      this.options.$schema = `https://schemas.wp.org/trunk/theme.json`
    if (!this.options.version) this.options.version = 2
    if (!this.options.path) this.options.path = `../theme.json`
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
        dependencies: new SyncWaterfallHook([`dependencies`]),
        options: new AsyncSeriesWaterfallHook([`options`]),
      }
      hookMap.set(compilation, hooks)
    }

    return hooks
  }

  /**
   * Apply plugin
   *
   * @param compiler - Webpack compiler
   * @returns void
   */
  public apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(
      this.constructor.name,
      compilation => {
        const hooks =
          ThemeJsonWebpackPlugin.getCompilationHooks(compilation)

        compilation.hooks.processAssets.tapPromise(
          this.plugin,
          async assets => {
            const data = await hooks.options.promise(
              omit(this.options, `path`),
            )
            const source = new compiler.webpack.sources.RawSource(
              JSON.stringify(data, null, 2),
            )
            const path = relative(
              compilation.options.output.path,
              this.options.path,
            )

            compilation.emitAsset(path, source)
          },
        )
      },
    )
  }

  public get plugin() {
    return {
      name: this.constructor.name,
      stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
    }
  }
}
