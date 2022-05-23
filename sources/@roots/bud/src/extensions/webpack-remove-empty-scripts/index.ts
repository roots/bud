import {Extension} from '@roots/bud-framework'
import {
  label,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'webpack-remove-empty-scripts'

@label('webpack-remove-empty-scripts')
@plugin(Plugin)
@production
class BudRemoveEmptyScripts extends Extension<null, Plugin> {}

export default BudRemoveEmptyScripts
