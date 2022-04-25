import {Extension} from '@roots/bud-framework'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {
  EntrypointsWebpackPlugin,
  Options,
} from '@roots/entrypoints-webpack-plugin'

@label('@roots/bud-entrypoints')
@options({emitHtml: false})
@plugin(EntrypointsWebpackPlugin)
class BudEntrypointsExtension extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {}

export default BudEntrypointsExtension
