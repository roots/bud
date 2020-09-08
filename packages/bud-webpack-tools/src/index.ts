import {Plugin} from '@roots/bud-typings'
import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'
import EntrypointsWebpackPlugin from './EntrypointsWebpackPlugin'
import MergedManifestWebpackPlugin from './MergedManifestWebpackPlugin'

const mergedManifestPlugin = bud => ({
  bud,
  make: function () {
    return new MergedManifestWebpackPlugin()
  },
})

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

const budDistTools: Plugin = bud => ({
  bud,
  make: function () {
    this.bud.plugins.set('webpack-wp-deps', externalsPlugin)
    this.bud.plugins.set(
      'webpack-entrypoints',
      entrypointsPlugin,
    )
    this.bud.plugins.set(
      'merged-manifest-webpack-plugin',
      mergedManifestPlugin,
    )
  },
})

module.exports = budDistTools
