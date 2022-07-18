import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import {
  CleanWebpackPlugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'

/**
 * `clean-webpack-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@when`
 */
@label('clean-webpack-plugin')
@plugin(CleanWebpackPlugin)
@options({
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
  cleanOnceBeforeBuildPatterns: ['**/*'],
})
@when(
  async ({hooks, isProduction}) =>
    hooks.filter('feature.clean') && isProduction,
)
export default class BudClean extends Extension<
  PluginOptions,
  CleanWebpackPlugin
> {}
