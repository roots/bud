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
    `css/${app.path('@name').replace('[ext]', '.css')}`,

  /**
   * css chunk output filename
   *
   * @param app - Bud
   * @returns chunk filename
   *
   * @public
   */
  chunkFilename: (app: Bud) =>
    `css/${app.path('@name').replace('[ext]', '.bundle.css')}`,
})
@production
export default class MiniCssExtract extends Extension<
  PluginOptions,
  MiniCssPlugin
> {}
