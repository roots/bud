import {BudInterface, Plugin} from '@roots/bud'
import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'
import EntrypointsWebpackPlugin from './EntrypointsWebpackPlugin'
import MergedManifestWebpackPlugin from './MergedManifestWebpackPlugin'

const mergedManifestPlugin = (bud: BudInterface) => ({
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

const budWordPressManifests: Plugin = bud => ({
  bud,
  make() {
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

module.exports = budWordPressManifests
