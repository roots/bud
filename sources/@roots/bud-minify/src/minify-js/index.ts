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
    const {
      default: Minimizer,
      esbuildMinify,
      swcMinify,
      terserMinify,
    } = await import(`terser-webpack-plugin`)

    if (!this.minify && extensions.has(`@roots/bud-swc`))
      this.setMinify(() => swcMinify)

    if (!this.minify && extensions.has(`@roots/bud-esbuild`))
      this.setMinify(() => esbuildMinify)

    if (!this.minify) this.setMinify(() => terserMinify)

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => [
      ...minimizers.filter(minimizer => !(minimizer instanceof Minimizer)),
      new Minimizer({...this.options}),
    ])
  }
}

export default BudMinimizeJS
export type {BudMinimizeJS, BudMinimizeJSPublicInterface}
