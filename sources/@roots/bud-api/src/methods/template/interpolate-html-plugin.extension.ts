import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import InterpolateHtmlPlugin from './interpolate-html-plugin.plugin.js'

/**
 * BudInterpolateHTMLPlugin
 *
 * @public
 * @decorator `@label`
 */
@label(`interpolate-html-plugin`)
@options({})
export default class BudInterpolateHtmlPlugin extends Extension<
  Record<string, RegExp>,
  InterpolateHtmlPlugin
> {
  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make() {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin.getHooks,
      this.options,
    )
  }
}
