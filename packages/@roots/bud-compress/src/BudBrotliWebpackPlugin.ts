import type {Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudBrotliWebpackPlugin
  extends Extension.CompilerPlugin<
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

  when: ({store}) => store.isTrue('brotli'),

  api: {
    brotli: function (options) {
      this.store.set('brotli', true)
      if (options)
        this.extensions
          .get('compression-webpack-plugin-brotli')
          .options.setStore(options)

      return this
    },
  },
}

export {BudBrotliWebpackPlugin}
