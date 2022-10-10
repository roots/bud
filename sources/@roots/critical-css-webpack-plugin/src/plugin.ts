import * as critical from 'critical'
import {bind} from 'helpful-decorators'
import vinyl from 'vinyl'
import Webpack from 'webpack'

import type {Options} from './interface.js'

export {Options}

/**
 * Default options
 *
 * @public
 */
const INIT_OPTIONS = {
  inline: false,
  extract: true,
  width: 1300,
  height: 900,
  request: {
    https: {
      rejectUnauthorized: false,
    },
  },
}

/**
 * CriticalCSSWebpackPlugin
 *
 * @public
 */
export default class CriticalCssWebpackPlugin {
  /**
   * Plugin ident
   *
   * @public
   */
  public plugin = {
    name: `CriticalCssWebpackPlugin`,
    stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_DERIVED,
  }

  /**
   * Webpack lifecycle events
   *
   * @public
   */
  public webpack: {
    compiler: Webpack.Compiler
    compilation: Webpack.Compilation
  } = {
    compiler: null,
    compilation: null,
  }

  /**
   * Class constructor
   *
   * @param options - {@link Options}
   *
   * @public
   */
  public constructor(public options: Options = INIT_OPTIONS) {}

  /**
   * Webpack apply hook
   *
   * @remarks
   * Webpack compiler callback
   *
   * @param compiler - Webpack compiler
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public compilation(compilation: Webpack.Compilation): void {
    this.webpack.compilation = compilation

    this.webpack.compilation.hooks.processAssets.tapAsync(
      this.plugin,
      this.processAssets,
    )
  }

  /**
   * Process assets
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processAssets(
    assets: Webpack.Compilation['assets'],
    callback: () => any,
  ) {
    const base =
      this.options.base ?? this.webpack.compilation.outputOptions.path

    await Promise.all(
      Object.entries(assets).map(async ([entryIdent, entryValue]) => {
        if (!entryIdent.endsWith(`.css`)) return

        const asset = this.webpack.compilation.getAsset(entryIdent)

        const vfile = new vinyl({
          base,
          path: asset.name,
          contents: asset.source.buffer(),
        })

        try {
          await critical
            .generate({
              ...this.options,
              base,
              css: [vfile],
            })
            .then(({css, uncritical}) => {
              this.webpack.compilation.updateAsset(
                asset.name,
                new Webpack.sources.RawSource(uncritical),
              )

              this.webpack.compilation.emitAsset(
                `critical/${asset.name.split(`.`).shift().concat(`.css`)}`,
                new Webpack.sources.RawSource(css),
                asset.info,
              )
            })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
          throw error
        }
      }),
    )

    callback()
  }
}
