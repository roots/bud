import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import webpack from 'webpack'

/**
 * Webpack provide plugin configuration
 */
@label(`@roots/bud-extensions/webpack-provide-plugin`)
@plugin(webpack.ProvidePlugin)
@options({})
export default class BudProvide extends Extension<
  Record<string, any>,
  webpack.ProvidePlugin
> {
  /**
   * {@link Extension.when}
   */
  @bind
  public override when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
