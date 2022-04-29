import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {DefinePlugin} from 'webpack'

@label('webpack:define-plugin')
@plugin(DefinePlugin)
class BudDefine extends Extension<
  Record<string, DefinePlugin['definitions']>,
  DefinePlugin
> {
  @bind
  public async init() {
    this.setOptions(this.app.env.getPublicEnv())
  }

  @bind
  public async when() {
    return this.options && Object.keys(this.options).length > 0
  }
}

export default BudDefine
