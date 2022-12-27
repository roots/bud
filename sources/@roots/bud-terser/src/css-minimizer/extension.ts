import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  Plugin,
} from '@roots/bud-support/css-minimizer-webpack-plugin'
import type {WebpackPluginInstance} from '@roots/bud-support/webpack'

/**
 * Terser extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
 * @decorator `@disabled`
 */
@label(`@roots/bud-terser/css-minimizer`)
@expose(`minimizeCss`)
@options({
  minimizerOptions: {
    preset: [
      `default`,
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  },
})
@disabled
export class BudMinimizeCss extends Extension<BasePluginOptions, Plugin> {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  public override async buildBefore({hooks, module}: Bud) {
    const {Plugin} = await module.import(
      `@roots/bud-support/css-minimizer-webpack-plugin`,
    )

    hooks.on(`build.optimization.minimizer`, (minimizer = []) => {
      minimizer.push(
        new Plugin(this.options) as unknown as WebpackPluginInstance,
      )
      return minimizer
    })
  }
}
