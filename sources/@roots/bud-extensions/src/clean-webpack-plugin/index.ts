import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/bud-support/clean-webpack-plugin'

import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {Plugin} from '@roots/bud-support/clean-webpack-plugin'
import isUndefined from '@roots/bud-support/isUndefined'

/**
 * Clean webpack plugin configuration
 */
@label(`@roots/bud-extensions/clean-webpack-plugin`)
@expose(`clean`)
@plugin(Plugin)
@options<Options>({
  /**
   * Clean before path patterns
   */
  cleanOnceBeforeBuildPatterns: [`**/*`],

  /**
   * Clean stale assets
   */
  cleanStaleWebpackAssets: true,

  /**
   * Protect webpack assets from accidental deletion
   */
  protectWebpackAssets: true,
})
export default class BudClean extends Extension<Options, Plugin> {
  /**
   * {@link Extension.when}
   */
  public override when(bud: Bud) {
    if (this.enabled === false) return false
    if (!isUndefined(bud.context.clean)) return bud.context.clean
    return bud.isProduction
  }
}
