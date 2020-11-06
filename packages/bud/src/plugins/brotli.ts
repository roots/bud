import CompressionPlugin from 'compression-webpack-plugin'

export const options: Framework.Extension.Options = {
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

export const when: Framework.Extension.When = bud =>
  bud.features.enabled('brotli')

export const make: Framework.Extension.Make = opts =>
  new CompressionPlugin(
    opts as CompressionPlugin.Options<
      Framework.Extension.Options
    >,
  )
