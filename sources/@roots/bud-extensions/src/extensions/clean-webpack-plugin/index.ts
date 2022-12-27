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
 * `clean-webpack-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@production`
 */
@label(`@roots/bud-extensions/clean-webpack-plugin`)
@plugin(Plugin)
@options<Options>({
  /**
   * Clean stale assets
   *
   * @public
   */
  cleanStaleWebpackAssets: true,

  /**
   * Protect webpack assets from accidental deletion
   *
   * @public
   */
  protectWebpackAssets: true,

  /**
   * Clean before path patterns
   *
   * @public
   */
  cleanOnceBeforeBuildPatterns: [`**/*`],
})
@production
export default class BudClean extends Extension<Options, Plugin> {}
