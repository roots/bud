import Compression from 'compression-webpack-plugin'

/**
 * Gzip
 */
const gzip: Framework.Extension.Factory = bud => ({
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
    return this.bud.store['features'].enabled('gzip')
  },
})

/**
 * Brotli
 */
const brotli: Framework.Extension.Factory = bud => ({
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
    return this.bud.store['features'].get('brotli')
  },
})

export {brotli, gzip}
