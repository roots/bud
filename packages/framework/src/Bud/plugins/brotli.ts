import CompressionPlugin from 'compression-webpack-plugin'

export const options: Adapter.options = {
  filename: '[path].br',
  algorithm: 'brotliCompress',
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export const when: Adapter.when = bud =>
  bud.store['features'].enabled('brotli')

export const make: Adapter.make = opts =>
  new CompressionPlugin(
    opts as CompressionPlugin.Options<Adapter.options>,
  )
