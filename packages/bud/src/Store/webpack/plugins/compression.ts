import Bud from '@roots/bud-types'
import Compression from 'compression-webpack-plugin'

/**
 * Gzip
 */
const gzip: Bud.Plugin.Factory = bud => ({
  bud,

  options: {
    filename: '[path].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  },

  make: function (): Compression {
    return new Compression(this.options)
  },

  when: function () {
    return this.bud.features.enabled('gzip')
  },
})

/**
 * Brotli
 */
const brotli: Bud.Plugin.Factory = bud => ({
  bud,

  options: {
    filename: '[path].gz',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  },

  make: function (): Compression {
    return new Compression(this.options)
  },

  when: function () {
    return this.bud.store.get('features', 'brotli')
  },
})

export {brotli, gzip}
