import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'
import {type HotModuleReplacementPlugin} from '@roots/bud-support/webpack'

/**
 * Hot module replacement plugin configuration
 */
@label(`@roots/bud-extensions/webpack-hot-module-replacement-plugin`)
export default class BudHMR extends Extension<
  NonNullable<unknown>,
  HotModuleReplacementPlugin
> {
  /**
   * {@link Extension.make}
   */
  public override async make(bud: Bud) {
    const webpack = await bud.module.import(
      `@roots/bud-support/webpack`,
      import.meta.url,
    )
    return new webpack.HotModuleReplacementPlugin()
  }

  /**
   * {@link Extension.when}
   */
  public override when(bud: Bud) {
    if (bud.isProduction) return false
    if (bud.context.hot === false) return false

    return true
  }
}
