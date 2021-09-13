import {Extension} from '@roots/bud-framework'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

interface BudEntrypointsPlugin
  extends Extension.CompilerPlugin {}

const BudEntrypointsPlugin: BudEntrypointsPlugin = {
  name: '@roots/bud-entrypoints',
  make: () => new EntrypointsWebpackPlugin(),
}

export {BudEntrypointsPlugin}
