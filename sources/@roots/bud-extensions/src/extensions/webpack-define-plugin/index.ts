import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'
import Webpack from '@roots/bud-support/webpack'

/**
 * `@roots/bud-extensions/webpack-define-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 */
@label(`@roots/bud-extensions/webpack-define-plugin`)
@plugin(Webpack.DefinePlugin)
export default class BudDefine extends Extension<
  Webpack.DefinePlugin['definitions'],
  Webpack.DefinePlugin
> {
  /**
   * `init` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init({env}: Bud) {
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
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when(
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
