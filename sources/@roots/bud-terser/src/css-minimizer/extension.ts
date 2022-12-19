import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {WebpackPluginInstance} from '@roots/bud-support/webpack'
import Plugin from 'css-minimizer-webpack-plugin'

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
export class BudMinimizeCss extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async buildBefore({hooks}: Bud) {
    hooks.on(`build.optimization.minimizer`, (minimizer = []) => {
      minimizer.push(
        new Plugin(this.options) as unknown as WebpackPluginInstance,
      )
      return minimizer
    })
  }
}
