import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'
import type Webpack from '@roots/bud-support/webpack'

/**
 * This is the extension that enables hot module replacement in `development` mode
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@development`
 */
@label(`@roots/bud-extensions/webpack-hot-module-replacement-plugin`)
export default class BudHMR extends Extension<
  {},
  Webpack.HotModuleReplacementPlugin
> {
  public override async when(bud: Bud) {
    if (bud.isCLI() && bud.context.args.hot === false) return false
    return bud.isDevelopment
  }

  public override async make(bud: Bud) {
    const {
      default: {HotModuleReplacementPlugin},
    } = await import(`@roots/bud-support/webpack`)

    return new HotModuleReplacementPlugin()
  }
}
