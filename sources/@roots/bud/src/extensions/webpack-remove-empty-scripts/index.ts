import {Extension} from '@roots/bud-framework'
import {
  label,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'webpack-remove-empty-scripts'

/**
 * `webpack-remove-empty-scripts` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@production`
 */
@label('webpack-remove-empty-scripts')
@plugin(Plugin)
@production
export default class BudRemoveEmptyScripts extends Extension<
  null,
  Plugin
> {}
