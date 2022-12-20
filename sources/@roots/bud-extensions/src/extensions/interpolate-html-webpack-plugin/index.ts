import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import InterpolateHtmlPlugin, {
  Options,
} from './interpolate-html-webpack-plugin.js'

export type {Options}

/**
 * BudInterpolateHTMLPlugin
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
@options<Options>({})
@disabled
export default class BudInterpolateHtmlPlugin extends Extension<
  Options,
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
