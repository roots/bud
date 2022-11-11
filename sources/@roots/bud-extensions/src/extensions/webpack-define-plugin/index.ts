import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Webpack from 'webpack'

@label(`@roots/bud-extensions/webpack-define-plugin`)
@plugin(Webpack.DefinePlugin)
export default class BudDefine extends Extension<
  Record<string, any>,
  Webpack.DefinePlugin
> {
  @bind
  public override async init() {
    if (!this.app.env.getPublicEnv()) return

    this.setOptions(
      Object.entries(this.app.env.getPublicEnv()).reduce(
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
  public override async when() {
    return this.options && Object.keys(this.options).length > 0
  }
}
