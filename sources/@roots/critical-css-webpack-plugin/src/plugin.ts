/* eslint-disable no-console */
import {join} from 'node:path'

import * as critical from 'critical'
import {bind} from 'helpful-decorators'
import vinyl from 'vinyl'
import Webpack from 'webpack'

import type {Options} from './interface.js'

export type {Options}

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
  public plugin = {
    name: `CriticalCssWebpackPlugin`,
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED,
  }

  /**
   * Webpack lifecycle events
   */
  public webpack: {
    compilation: Webpack.Compilation
    compiler: Webpack.Compiler
  } = {
    compilation: null,
    compiler: null,
  }

  /**
   * Class constructor
   *
   * @param options - {@link Options}
   */
  public constructor(options?: Options) {
    options && Object.assign(this.options, options)
  }

  /**
   * Webpack apply hook
   *
   * @remarks
   * Webpack compiler callback
   *
   * @param compiler - Webpack compiler
   */
  @bind
  public async apply(compiler: Webpack.Compiler): Promise<void> {
    this.webpack.compiler = compiler

    this.webpack.compiler.hooks.thisCompilation.tap(
      this.plugin,
      this.compilation,
    )
  }

  /**
   * Compilation hook
   */
  @bind
  public compilation(compilation: Webpack.Compilation): void {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tapPromise(
      this.plugin,
      this.processAssets,
    )
  }

  /**
   * Process assets
   */
  @bind
  public async processAssets(assets: Webpack.Compilation['assets']) {
    const base =
      this.options.base ?? this.webpack.compilation.outputOptions.path

    await Promise.all(
      Object.keys(assets).map(async ident => {
        if (!ident.endsWith(`.css`)) return

        const asset = this.webpack.compilation.getAsset(ident)

        const vfile = new vinyl({
          base,
          contents: asset.source.buffer(),
          path: asset.name,
        })

        try {
          await critical
            .generate({
              ...this.options,
              base,
              css: [vfile],
            })
            .then(({css, uncritical}) => {
              if (this.options.extract) {
                this.webpack.compilation.updateAsset(
                  asset.name,
                  new Webpack.sources.RawSource(uncritical),
                )
              }

              this.webpack.compilation.emitAsset(
                join(
                  `critical`,
                  asset.name.split(`.`).shift().concat(`.css`),
                ),
                new Webpack.sources.RawSource(css),
                asset.info,
              )
            })
        } catch (error) {
          console.error(error)
          throw error
        }
      }),
    )
  }
}
