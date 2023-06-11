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
    const {
      default: Minimizer,
      esbuildMinify,
      lightningCssMinify,
      swcMinify,
    } = await import(`css-minimizer-webpack-plugin`)

    if (!this.minify && extensions.has(`@roots/bud-swc`))
      this.setMinify(() => swcMinify)

    if (!this.minify && extensions.has(`@roots/bud-esbuild`))
      this.setMinify(() => esbuildMinify)

    if (!this.minify) this.setMinify(() => lightningCssMinify)

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers.filter(minimizer => !(minimizer instanceof Minimizer)),
      new Minimizer({...this.options}),
    ])
  }
}

export default BudMinimizeCSS
export type {
  BudMinimizeCSS,
  BudMinimizeCSSOptions,
  BudMinimizeCSSPublicInterface,
}
