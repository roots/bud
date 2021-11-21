import {Extension} from '@roots/bud-framework'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

/**
 * BudEntrypointsPlugin interface
 *
 * @public
 */
interface BudEntrypointsPlugin
  extends Extension.CompilerPlugin {}

/**
 * BudEntrypointsPlugin
 *
 * @public
 */
const BudEntrypointsPlugin: BudEntrypointsPlugin = {
  name: '@roots/bud-entrypoints',
  make(options) {
    new EntrypointsWebpackPlugin(options.all())
  },
}

export {BudEntrypointsPlugin}
