import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Webpack from 'webpack'

/**
 * `@roots/bud-extensions/webpack-provide-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 */
@label(`@roots/bud-extensions/webpack-provide-plugin`)
@plugin(Webpack.ProvidePlugin)
export default class BudProvide extends Extension<
  Record<string, any>,
  Webpack.ProvidePlugin
> {
  /**
   * `when` callback
   *
   * @remarks
   * Returns `true` when `options` are defined
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
