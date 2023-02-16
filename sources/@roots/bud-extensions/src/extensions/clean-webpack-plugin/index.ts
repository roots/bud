import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/bud-support/clean-webpack-plugin'
import {Plugin} from '@roots/bud-support/clean-webpack-plugin'
/**
 * Clean webpack plugin configuration
 */
@label(`@roots/bud-extensions/clean-webpack-plugin`)
@plugin(Plugin)
@options<Options>({
  /**
   * Clean stale assets
   */
  cleanStaleWebpackAssets: true,

  /**
   * Protect webpack assets from accidental deletion
   */
  protectWebpackAssets: true,

  /**
   * Clean before path patterns
   */
  cleanOnceBeforeBuildPatterns: [`**/*`],
})
@production
export default class BudClean extends Extension<Options, Plugin> {}
