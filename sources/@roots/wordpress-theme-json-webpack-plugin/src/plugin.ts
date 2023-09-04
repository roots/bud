import type {
  CompilationHooks,
  Options,
} from '@roots/wordpress-theme-json-webpack-plugin'
import type {Compiler, WebpackPluginInstance} from 'webpack'

import {relative} from 'node:path'

import omit from 'lodash/omit.js'
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
   * {@see https://webpack.js.org/api/compilation-hooks/}
   */
  public static getCompilationHooks(
    compilation: Webpack.Compilation,
  ): CompilationHooks {
    let hooks = hookMap.get(compilation)

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
   * Plugin data
   */
  public data: Record<string, any> = {
    __generated__: `⚠️ This file is generated. Do not edit.`,
    $schema: `https://schemas.wp.org/trunk/theme.json`,
    version: 2,
  }

  /**
   * Class constructor
   *
   * @param options - Plugin options
   */
  public constructor(public options: Options) {}

  /**
   * {@link WebpackPluginInstance.apply}
   */
  public apply(compiler: Compiler) {
    if (!this.options.path) this.options.path = `../theme.json`

    compiler.hooks.thisCompilation.tap(
      this.constructor.name,
      compilation => {
        const hooks =
          ThemeJsonWebpackPlugin.getCompilationHooks(compilation)

        compilation.hooks.processAssets.tapPromise(
          this.plugin,
          async () => {
            const data = await hooks.options.promise(
              omit(this.options, `path`),
            )

            Object.assign(this.data, data)

            const source = new compiler.webpack.sources.RawSource(
              JSON.stringify(this.data, null, 2),
            )

            compilation.emitAsset(
              relative(
                compilation.options.output.path as string,
                this.options.path as string,
              ),
              source,
            )
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
