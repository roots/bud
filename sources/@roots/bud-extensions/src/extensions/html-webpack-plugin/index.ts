import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type Plugin from 'html-webpack-plugin'

@label(`@roots/bud-extensions/html-webpack-plugin`)
@options<Plugin.Options>({
  inject: true,
  template: `auto`,
  publicPath: app => app.publicPath(),
})
@disabled
export default class BudHtmlWebpackPlugin extends Extension<
  Plugin.Options,
  Plugin
> {
  /**
   * Make extension
   *
   * @param _bud - bud instance
   * @param options - plugin options
   *
   * @public
   */
  public async make(_bud: Bud, options: Plugin.Options) {
    const HTMLWebpackPlugin = await import(`html-webpack-plugin`).then(
      m => m.default,
    )

    return new HTMLWebpackPlugin(options)
  }
}
