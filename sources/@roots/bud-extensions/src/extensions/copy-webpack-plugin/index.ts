import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import CopyWebpackPlugin, {PluginOptions} from 'copy-webpack-plugin'

/**
 * `copy-webpack-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@when`
 */
@label(`@roots/bud-extensions/copy-webpack-plugin`)
@plugin(CopyWebpackPlugin)
@options<PluginOptions>({patterns: []})
@when(async (_app, options) => options.patterns?.length > 0)
class BudCopyPlugin extends Extension<PluginOptions, CopyWebpackPlugin> {}

export default BudCopyPlugin
