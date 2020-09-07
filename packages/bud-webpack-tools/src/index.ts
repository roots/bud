import {Plugin} from '@roots/bud-typings'
import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'
import EntrypointsWebpackPlugin from './EntrypointsWebpackPlugin'

const externalsPlugin = bud => ({
  bud,
  make: function () {
    return new WordPressExternalsWebpackPlugin()
  },
})

const entrypointsPlugin = bud => ({
  bud,
  make: function () {
    return new EntrypointsWebpackPlugin()
  },
})

const wordpressExternals: Plugin = bud => ({
  bud,
  make: function () {
    this.bud.plugins.set('webpack-wp-deps', externalsPlugin)
    this.bud.plugins.set(
      'webpack-entrypoints',
      entrypointsPlugin,
    )
  },
})

module.exports = wordpressExternals
