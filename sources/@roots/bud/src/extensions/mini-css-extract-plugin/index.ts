import {Bud, Extension} from '@roots/bud-framework'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import MiniCssPlugin, {PluginOptions} from 'mini-css-extract-plugin'

/**
 * `mini-css-extract-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@production`
 */
@label('mini-css-extract-plugin')
@plugin(MiniCssPlugin)
@options({
  /**
   * css output filename
   *
   * @param app - Bud
   * @returns filename
   *
   * @public
   */
  filename: (app: Bud) =>
    app.hooks.filter('feature.hash') && app.isProduction
      ? app.hooks.filter('value.hashFormat').concat('.css')
      : app.hooks.filter('value.fileFormat').concat('.css'),

  /**
   * css chunk output filename
   *
   * @param app - Bud
   * @returns chunk filename
   *
   * @public
   */
  chunkFilename: (app: Bud) =>
    app.hooks.filter('feature.hash') && app.isProduction
      ? app.hooks.filter('value.hashFormat').concat('.css')
      : app.hooks.filter('value.fileFormat').concat('.css'),
})
@production
export default class MiniCssExtract extends Extension<
  PluginOptions,
  MiniCssPlugin
> {}
