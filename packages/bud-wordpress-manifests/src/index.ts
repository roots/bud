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

const budWordPressBuildTools: Plugin = bud => ({
  bud,
  make: function () {
    this.bud.plugins.set(
      'wordpress-externals-webpack-plugin',
      externalsPlugin,
    )

    this.bud.plugins.set(
      'entrypoints-webpack-plugin',
      entrypointsPlugin,
    )

    this.bud.plugins.set(
      'merged-manifest-webpack-plugin',
      mergedManifestPlugin,
    )
  },
})

module.exports = budWordPressBuildTools
