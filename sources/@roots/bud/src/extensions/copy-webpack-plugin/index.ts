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
@label('copy-webpack-plugin')
@plugin(CopyWebpackPlugin)
@options<PluginOptions>({patterns: []})
@when(async options => options.patterns?.length > 0)
export default class BudCopyPlugin extends Extension<
  PluginOptions,
  CopyWebpackPlugin
> {}
