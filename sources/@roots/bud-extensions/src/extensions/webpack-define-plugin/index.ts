import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import webpack from 'webpack'

/**
 * Define plugin configuration
 */
@label(`@roots/bud-extensions/webpack-define-plugin`)
@plugin(webpack.DefinePlugin)
export default class BudDefine extends Extension<
  webpack.DefinePlugin['definitions'],
  webpack.DefinePlugin
> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({env}: Bud) {
    if (!env.getPublicEnv()) return

    this.setOptions(
      Object.entries(env.getPublicEnv()).reduce(
        (values, [key, value]) => ({
          ...values,
          [key]: JSON.stringify(value),
        }),
        {},
      ),
    )
  }

  /**
   * {@link Extension.when}
   */
  @bind
  public override when(
    _bud: Bud,
    options?: webpack.DefinePlugin['definitions'],
  ) {
    return options && Object.keys(options).length > 0
  }
}
