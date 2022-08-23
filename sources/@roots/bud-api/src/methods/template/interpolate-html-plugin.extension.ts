import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin.js'

/**
 * BudInterpolateHTMLPlugin
 *
 * @public
 * @decorator `@label`
 */
@label(`interpolate-html-plugin`)
export default class BudInterpolateHtmlPlugin extends Extension<
  Record<string, RegExp>,
  InterpolateHtmlPlugin
> {
  /**
   * public env accessor
   *
   * @public
   */
  public get publicEnv() {
    return this.app.env.getPublicEnv() ?? {}
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    Object.entries(this.app.env.getPublicEnv()).map(([key, value]) => {
      this.setOption(key, value)
    })
  }

  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make() {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin as any,
      this.options,
    )
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return this.options ? true : false
  }
}
