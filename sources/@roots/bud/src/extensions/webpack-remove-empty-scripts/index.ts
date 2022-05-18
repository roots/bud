import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'webpack-remove-empty-scripts'

@label('webpack-remove-empty-scripts')
@plugin(Plugin)
class BudRemoveEmptyScripts extends Extension<null, Plugin> {
  @bind
  public async when() {
    return this.app.isProduction
  }
}

export default BudRemoveEmptyScripts
