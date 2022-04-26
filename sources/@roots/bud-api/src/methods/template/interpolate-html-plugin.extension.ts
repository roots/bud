import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'
import {bind} from '@roots/bud-support'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {InterpolateHtmlPlugin} from './interpolate-html-plugin.plugin'

@label('interpolate-html-plugin')
class BudInterpolateHtmlPlugin extends Extension<
  Record<string, RegExp>,
  InterpolateHtmlPlugin
> {
  public get publicEnv() {
    return this.app.env.getPublicEnv() ?? {}
  }

  @bind
  public async register() {
    this.options = {
      ...this.publicEnv,
      ...this.app.extensions.get('webpack:define-plugin').get('options'),
    }
  }

  @bind
  public async make(options) {
    return new InterpolateHtmlPlugin(HtmlWebpackPlugin as any, options)
  }

  /**
   * @public
   */
  @bind
  public async when(options) {
    return options ? true : false
  }
}

export default BudInterpolateHtmlPlugin
