import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'
import {
  type HotModuleReplacementPlugin,
  default as Webpack,
} from '@roots/bud-support/webpack'

/**
 * Hot module replacement plugin configuration
 */
@label(`@roots/bud-extensions/webpack-hot-module-replacement-plugin`)
@plugin(Webpack.HotModuleReplacementPlugin)
export default class BudHMR extends Extension<
  {},
  HotModuleReplacementPlugin
> {
  /**
   * {@link Extension.when}
   */
  public override when(bud: Bud) {
    if (bud.isProduction) return false
    if (bud.context.hot === false) return false

    return true
  }
}
