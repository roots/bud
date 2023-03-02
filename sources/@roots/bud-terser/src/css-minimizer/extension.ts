import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  production,
} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  Plugin,
} from '@roots/bud-support/css-minimizer-webpack-plugin'

/**
 * Terser css minimizer configuration
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
@production
export class BudMinimizeCss extends Extension<BasePluginOptions, Plugin> {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({hooks}: Bud) {
    const {Plugin} = await import(
      `@roots/bud-support/css-minimizer-webpack-plugin`
    )

    hooks.on(`build.optimization.minimizer`, (minimizer = []) => {
      minimizer.push(new Plugin(this.options))
      this.logger.success(`css-minimizer added to minimizers`)
      return minimizer
    })
  }
}
