import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  production,
} from '@roots/bud-framework/extension/decorators'

import {
  BudMinimizeJSPublicApi,
  type BudMinimizeJSPublicInterface,
} from './extension.config.js'

/**
 * JS minimizer configuration
 */
@label(`@roots/bud-terser/js-minimize`)
@production
class BudMinimizeJS extends BudMinimizeJSPublicApi {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({extensions, hooks}) {
    const Terser = await import(`terser-webpack-plugin`)

    if (!this.options.minify) {
      this.setMinify(() =>
        extensions.has(`@roots/bud-swc`)
          ? Terser.swcMinify
          : extensions.has(`@roots/bud-esbuild`)
          ? Terser.esbuildMinify
          : Terser.terserMinify,
      )
    }

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => {
      minimizers = [
        ...minimizers.filter(min => !(min instanceof Terser.default)),
        new Terser.default({...this.options}),
      ]

      this.logger.success(`terser added to minimizers`, {...this.options})
      return minimizers
    })
  }
}

export default BudMinimizeJS
export type {BudMinimizeJS, BudMinimizeJSPublicInterface}
