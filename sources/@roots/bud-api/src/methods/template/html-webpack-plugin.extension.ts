import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
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
> {
  @bind
  public async when() {
    return this.app.hooks.filter(`feature.html`, true)
  }
}
