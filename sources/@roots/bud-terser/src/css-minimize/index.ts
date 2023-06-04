import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  production,
} from '@roots/bud-framework/extension/decorators'

import {
  type BudMinimizeCSSOptions,
  BudMinimizeCSSPublicApi,
  type BudMinimizeCSSPublicInterface,
} from './extension.config.js'

/**
 * Terser css minimizer configuration
 */
@label(`@roots/bud-terser/css-minimize`)
@production
class BudMinimizeCSS extends BudMinimizeCSSPublicApi {
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

export default BudMinimizeCSS
export type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
  BudMinimizeCSSOptions,
}
