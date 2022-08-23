import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  when,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'css-minimizer-webpack-plugin'

/**
 * Terser extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
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
@when(async () => false)
export default class BudMinimizeCSS extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async buildBefore() {
    this.app.hooks.on(`build.optimization.minimizer`, minimizer => {
      minimizer.push(new Plugin(this.options))
      return minimizer
    })
  }
}
