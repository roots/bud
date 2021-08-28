import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

const BudEntrypointsPlugin = {
  name: '@roots/bud-entrypoints',
  make: () => new EntrypointsWebpackPlugin(),
}

export {BudEntrypointsPlugin}
