import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import CriticalCssWebpackPlugin, {
  Options,
} from '@roots/critical-css-webpack-plugin'

import {critical} from './critical.js'

/**
 * Adds critical css webpack plugin to compilation
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@production`
 */
@label('@roots/bud-criticalcss')
@plugin(CriticalCssWebpackPlugin)
@options<Options>({
  base: (app: Bud) => app.publicPath() ?? '/',
})
@production
export default class BudCriticalCss extends Extension<
  Options,
  CriticalCssWebpackPlugin
> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.api.bindFacade('critical', critical)
  }
}
