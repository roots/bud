import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import CopyWebpackPlugin, {PluginOptions} from 'copy-webpack-plugin'

@label('copy-webpack-plugin')
@options<PluginOptions>({patterns: []})
@plugin(require('copy-webpack-plugin'))
@when(async options => options.patterns?.length > 0)
class BudCopyPlugin extends Extension<PluginOptions, CopyWebpackPlugin> {}

export default BudCopyPlugin
