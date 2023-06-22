import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {
  type ProvidePlugin,
  default as Webpack,
} from '@roots/bud-support/webpack'

/**
 * Webpack provide plugin configuration
 */
@label(`@roots/bud-extensions/webpack-provide-plugin`)
@plugin(Webpack.ProvidePlugin)
@options({})
export default class BudProvide extends Extension<
  Record<string, any>,
  ProvidePlugin
> {
  /**
   * {@link Extension.when}
   */
  @bind
  public override when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
