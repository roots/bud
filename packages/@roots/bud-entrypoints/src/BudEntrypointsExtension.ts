import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

const BudEntrypointsExtension = {
  name: '@roots/bud-entrypoints',
  make: () => new EntrypointsWebpackPlugin(),
}

export {BudEntrypointsExtension}
