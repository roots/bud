import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

@label(`@roots/bud-extensions/html-webpack-plugin`)
@plugin(HtmlWebpackPlugin)
@options<HtmlWebpackPlugin.Options>({
  inject: true,
  template: `auto`,
  publicPath: app => app.publicPath(),
})
@disabled
export default class BudHtmlWebpackPlugin extends Extension<
  HtmlWebpackPlugin.Options,
  HtmlWebpackPlugin
> {}
