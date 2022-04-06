import type {Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudBrotliWebpackPlugin
  extends Extension.Plugin<
    Plugin,
    BudCompressionExtension.Options
  > {}

const BudBrotliWebpackPlugin: BudBrotliWebpackPlugin = {
  name: 'compression-webpack-plugin-brotli',

  options: {
    algorithm: 'brotliCompress',
    filename: '[name].br[query]',
    test: /\.js$|\.css$|\.html$|\.htm$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  },

  make: options => new Plugin(options.all()),

  when: ({store}) => store.is('features.brotli', true),

  api: {
    brotli: function (options) {
      this.store.set('features.brotli', true)
      if (options)
        this.extensions
          .get('compression-webpack-plugin-brotli')
          .setOptions(options)

      return this
    },
  },
}

export {BudBrotliWebpackPlugin}
