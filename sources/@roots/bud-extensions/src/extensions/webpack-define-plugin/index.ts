import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import Webpack from '@roots/bud-support/webpack'

/**
 * Define plugin configuration
 */
@label(`@roots/bud-extensions/webpack-define-plugin`)
@plugin(Webpack.DefinePlugin)
export default class BudDefine extends Extension<
  Webpack.DefinePlugin['definitions'],
  Webpack.DefinePlugin
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
    options?: Webpack.DefinePlugin['definitions'],
  ) {
    return (
      options &&
      !isUndefined(Object.keys(options)?.length) &&
      Object.keys(options).length > 0
    )
  }
}
