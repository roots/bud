import type {Bud, Extensions} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudBrotliWebpackPlugin
  extends Extensions.Module<BudCompressionExtension.Options, Plugin> {}

const BudBrotliWebpackPlugin: BudBrotliWebpackPlugin = {
  label: 'compression-webpack-plugin-brotli',

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

  when: ({hooks}) => hooks.filter('feature.brotli'),

  register: async app => {
    app.api.bindFacade('brotli', function (options) {
      const app = this as Bud
      app.hooks.on('feature.brotli', true)
      if (options)
        app.extensions
          .get('compression-webpack-plugin-brotli')
          .setOptions(options)

      return app
    })
  },
}

export {BudBrotliWebpackPlugin}
