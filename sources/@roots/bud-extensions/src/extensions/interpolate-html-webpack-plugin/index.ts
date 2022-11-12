import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import InterpolateHtmlPlugin from './interpolate-html-webpack-plugin.js'

/**
 * BudInterpolateHTMLPlugin
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
@options({})
@disabled
export default class BudInterpolateHtmlPlugin extends Extension<
  Record<string, RegExp | string>,
  InterpolateHtmlPlugin
> {
  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async make() {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin.getHooks,
      this.options,
    )
  }
}
