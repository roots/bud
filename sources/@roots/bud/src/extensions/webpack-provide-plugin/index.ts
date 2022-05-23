import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {ProvidePlugin} from 'webpack'

@label('webpack:provide-plugin')
@plugin(ProvidePlugin)
class BudProvide extends Extension<Record<string, any>, ProvidePlugin> {
  @bind
  public async when() {
    return this.options && Object.keys(this.options).length > 0
  }
}

export default BudProvide
