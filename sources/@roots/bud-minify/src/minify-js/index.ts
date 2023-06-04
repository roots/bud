import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators/label'
import {production} from '@roots/bud-framework/extension/decorators/production'
import {bind} from '@roots/bud-support/decorators/bind'

import {
  BudMinimizeJSPublicApi,
  type BudMinimizeJSPublicInterface,
} from './extension.config.js'

/**
 * JS minimizer configuration
 */
@label(`@roots/bud-minify/minify-js`)
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
      minimizers = [...minimizers, new Terser.default({...this.options})]
      return minimizers
    })
  }
}

export default BudMinimizeJS
export type {BudMinimizeJS, BudMinimizeJSPublicInterface}
