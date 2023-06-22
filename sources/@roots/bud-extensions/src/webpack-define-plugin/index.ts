import {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {
  type DefinePlugin,
  default as Webpack,
} from '@roots/bud-support/webpack'

/**
 * Define plugin configuration
 */
@label(`@roots/bud-extensions/webpack-define-plugin`)
@plugin(Webpack.DefinePlugin)
@options<DefinePlugin[`definitions`]>({})
export default class BudDefine extends Extension<
  DefinePlugin['definitions'],
  DefinePlugin
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
  public override when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
