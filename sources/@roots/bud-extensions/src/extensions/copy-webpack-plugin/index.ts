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
 * Copy webpack plugin configuration
 */
@label(`@roots/bud-extensions/copy-webpack-plugin`)
@plugin(Plugin)
@options<Options>({patterns: []})
@when((_app, options) => options.patterns?.length > 0)
class BudCopyPlugin extends Extension<Options, Plugin> {}

export default BudCopyPlugin
