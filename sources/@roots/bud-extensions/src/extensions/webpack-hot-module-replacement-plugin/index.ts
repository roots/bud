import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import type Webpack from '@roots/bud-support/webpack'

/**
 * Hot module replacement plugin configuration
 */
@label(`@roots/bud-extensions/webpack-hot-module-replacement-plugin`)
export default class BudHMR extends Extension<
  {},
  Webpack.HotModuleReplacementPlugin
> {
  /**
   * {@link Extension.make}
   */
  @bind
  public override async make() {
    const {HotModuleReplacementPlugin} = await this.import(
      `@roots/bud-support/webpack`,
    )

    return new HotModuleReplacementPlugin()
  }

  /**
   * {@link Extension.when}
   */
  public override when(bud: Bud) {
    if (bud.isProduction) return false
    if (bud.isCLI() && bud.context.args.hot === false) return false

    return true
  }
}
