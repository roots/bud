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

@label('clean-webpack-plugin')
@plugin(CleanWebpackPlugin)
@when(async (_opt, {hooks}) => hooks.filter('feature.clean'))
@options({
  cleanStaleWebpackAssets: true,
  protectWebpackAssets: true,
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
})
export default class BudClean extends Extension<
  PluginOptions,
  CleanWebpackPlugin
> {}
