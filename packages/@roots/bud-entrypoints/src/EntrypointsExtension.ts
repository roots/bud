import {EntrypointsWebpackPlugin as Plugin} from '@roots/entrypoints-webpack-plugin'

const EntrypointsExtension = {
  name: '@roots/bud-entrypoints',
  make: () => new Plugin(),
}

export {EntrypointsExtension}
