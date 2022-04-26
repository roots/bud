import {Extension} from '@roots/bud-framework'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import MiniCssPlugin, {PluginOptions} from 'mini-css-extract-plugin'

@label('mini-css-extract-plugin')
@plugin(MiniCssPlugin)
@production
@options({
  filename: app =>
    app.hooks.filter('feature.hash') && app.isProduction
      ? app.hooks.filter('value.hashFormat').concat('.css')
      : app.hooks.filter('value.fileFormat').concat('.css'),
  chunkFilename: app =>
    app.hooks.filter('feature.hash') && app.isProduction
      ? app.hooks.filter('value.hashFormat').concat('.css')
      : app.hooks.filter('value.fileFormat').concat('.css'),
})
class CssExtract extends Extension<PluginOptions, MiniCssPlugin> {}

export default CssExtract
