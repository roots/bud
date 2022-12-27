import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/bud-support/copy-webpack-plugin'
import {Plugin} from '@roots/bud-support/copy-webpack-plugin'

/**
 * `copy-webpack-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@when`
 */
@label(`@roots/bud-extensions/copy-webpack-plugin`)
@plugin(Plugin)
@options<Options>({patterns: []})
@when(async (_app, options) => options.patterns?.length > 0)
class BudCopyPlugin extends Extension<Options, Plugin> {}

export default BudCopyPlugin
