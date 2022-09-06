import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

@label(`html-webpack-plugin`)
@plugin(HtmlWebpackPlugin)
@options<HtmlWebpackPlugin.Options>({
  inject: true,
  template: `auto`,
  publicPath: app => app.publicPath(),
})
export default class BudHtmlWebpackPlugin extends Extension<
  HtmlWebpackPlugin.Options,
  HtmlWebpackPlugin
> {}
