import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import webpack from '@roots/bud-support/webpack'

/**
 * `@roots/bud-extensions/webpack-provide-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 */
@label(`@roots/bud-extensions/webpack-provide-plugin`)
@plugin(webpack.ProvidePlugin)
@options({})
export default class BudProvide extends Extension<
  Record<string, any>,
  webpack.ProvidePlugin
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
  public override async when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
