import Plugin from 'compression-webpack-plugin'

import type {Compress} from '../'

const extension: Compress.Extension = {
  name: 'compression-webpack-plugin-gzip',

  options: {
    algorithm: 'gzip',
    filename: '[name].gz[query]',
    test: /\.js$|\.css$|\.html$/,
    compressionOptions: {
      level: 9,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  },

  make: options => new Plugin(options.all()),

  when: ({store}) => store.isTrue('gzip'),

  api: {
    gzip: function (options) {
      this.store.set('gzip', true)

      options &&
        this.hooks.on(
          'extension/compression-webpack-plugin-gzip/options',
          () => options,
        )

      return this
    },
  },
}

export const {name, options, make, api} = extension
