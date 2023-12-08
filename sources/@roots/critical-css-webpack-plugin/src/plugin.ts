/* eslint-disable no-console */
import type {Options} from '@roots/critical-css-webpack-plugin'

import {join} from 'node:path'

import * as critical from 'critical'
import {bind} from 'helpful-decorators'
import vinyl from 'vinyl'
import Webpack from 'webpack'

/**
 * CriticalCSSWebpackPlugin
 */
export default class CriticalCssWebpackPlugin {
  /**
   * Plugin options
   */
  public options: Options = {
    extract: true,
    height: 900,
    request: {
      https: {
        rejectUnauthorized: false,
      },
    },
    width: 1300,
  }

  /**
   * Plugin ident
   */
  public plugin: {
    name: string,
    stage: number,
  } = {
    name: `CriticalCssWebpackPlugin`,
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED,
  }

  /**
   * Class constructor
   *
   * @param options - The options for the plugin.
   */
  public constructor(options?: Options) {
    options && Object.assign(this.options, options)
  }

  /**
   * Webpack apply hook
   *
   * @remarks
   * This method is called when the plugin is applied to a {@link Webpack.Compiler | Compiler}.
   *
   * @param compiler - The {@link Webpack.Compiler | Compiler}.
   */
  @bind
  public async apply(compiler: Webpack.Compiler): Promise<void> {
    compiler.hooks.thisCompilation.tap(this.plugin, compilation => {
      compilation.hooks.processAssets.tapPromise(
        this.plugin,
        this.makeProcessAssetsHook(compilation),
      )
    })
  }

  /**
   * Process assets
   *
   * @param compilation - The {@link Webpack.Compilation | Compilation}.
   * @returns A function that processes the assets.
   */
  @bind
  public makeProcessAssetsHook(
    compilation: Webpack.Compilation,
  ) {
    return async (assets: Webpack.Compilation['assets']) => {
      const base = this.options.base ?? compilation.outputOptions.path

      await Promise.all(
        Object.keys(assets).map(async ident => {
          if (!ident.endsWith(`.css`)) return

          const asset = compilation.getAsset(ident)
          if (!asset) return

          compilation.buildDependencies.add(asset.name)

          const vfile = new vinyl({
            base,
            contents: asset.source.buffer(),
            path: asset.name,
          })

          const result = await critical
            .generate({
              ...this.options,
              base,
              css: [vfile],
            })
            .catch((error: Error) => {
              throw error
            })

          if (!result?.css) return // nothing to do here

          if (this.options.extract && result.uncritical) {
            compilation.updateAsset(
              asset.name,
              new Webpack.sources.RawSource(result.uncritical),
            )
          }

          compilation.emitAsset(
            join(`critical`, asset.name),
            new Webpack.sources.RawSource(result.css),
            asset.info,
          )
        }),
      )
    }
  }
}
