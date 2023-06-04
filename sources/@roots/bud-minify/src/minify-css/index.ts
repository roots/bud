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
@label(`@roots/bud-minify/minify-css`)
@production
class BudMinimizeCSS extends BudMinimizeCSSPublicApi {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({extensions, hooks}) {
    const CssMinimizer = await import(`css-minimizer-webpack-plugin`)

    if (!this.options.minify) {
      this.setMinify(() =>
        extensions.has(`@roots/bud-swc`)
          ? CssMinimizer.swcMinify
          : extensions.has(`@roots/bud-esbuild`)
          ? CssMinimizer.esbuildMinify
          : CssMinimizer.lightningCssMinify,
      )
    }

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => {
      minimizers.push(new CssMinimizer.default(this.options))
      this.logger.success(`css-minimizer added to minimizers`)
      return minimizers
    })
  }
}

export default BudMinimizeCSS
export type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
  BudMinimizeCSSOptions,
}
