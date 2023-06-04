import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators/label'
import {production} from '@roots/bud-framework/extension/decorators/production'
import {bind} from '@roots/bud-support/decorators/bind'

import {
  type BudMinimizeCSSOptions,
  BudMinimizeCSSPublicApi,
  type BudMinimizeCSSPublicInterface,
} from './extension.config.js'

/**
 * Css minimizer
 */
@label(`@roots/bud-terser/css-minimize`)
@production
class BudMinimizeCSS extends BudMinimizeCSSPublicApi {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({hooks}) {
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

export default BudMinimizeCSS
export type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
  BudMinimizeCSSOptions,
}
