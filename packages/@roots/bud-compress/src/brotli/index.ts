import type {Framework} from '@roots/bud-framework'
import Plugin from 'compression-webpack-plugin'

const extension: Framework.Compress.Extension = {
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

export default extension
export const {name, options, make, api} = extension
