import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  production,
} from '@roots/bud-framework/extension/decorators'

import {
  type Api,
  BudMinimizeCssConfig,
  type Options,
} from './extension.config.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-terser/css-minimizer': BudMinimizeCss
  }
}

/**
 * Terser css minimizer configuration
 */
@label(`@roots/bud-terser/css-minimizer`)
@expose(`minimizeCss`)
@production
class BudMinimizeCss extends BudMinimizeCssConfig {
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

export default BudMinimizeCss
export {type Api, type Options}
