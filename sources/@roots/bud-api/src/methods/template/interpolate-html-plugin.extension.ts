import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'
import {bind} from '@roots/bud-support'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin'

@label('interpolate-html-plugin')
export default class BudInterpolateHtmlPlugin extends Extension<
  Record<string, RegExp>,
  InterpolateHtmlPlugin
> {
  public get publicEnv() {
    return this.app.env.getPublicEnv() ?? {}
  }

  @bind
  public async register() {
    this.setOptions({
      ...this.publicEnv,
      ...this.app.extensions.get('webpack:define-plugin').options,
    })
  }

  @bind
  public async make() {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin as any,
      this.options,
    )
  }

  /**
   * @public
   */
  @bind
  public async when(options: Record<string, RegExp>) {
    return options ? true : false
  }
}
