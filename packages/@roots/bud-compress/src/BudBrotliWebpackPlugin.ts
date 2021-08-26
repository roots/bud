import type {WebpackPlugin} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudBrotliWebpackPlugin
  extends WebpackPlugin<
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
      options &&
        this.hooks.on(
          'extension/compression-webpack-plugin-brotli/options',
          () => options,
        )

      return this
    },
  },
}

export {BudBrotliWebpackPlugin}
