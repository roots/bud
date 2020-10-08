import CompressionPlugin from 'compression-webpack-plugin'

export const options: Adapter.options = {
  filename: '[path].gz',
  algorithm: 'gzip',
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export const when: Adapter.when = bud =>
  bud.store['features'].enabled('gzip')

export const make: Adapter.make = options =>
  new CompressionPlugin(
    options as CompressionPlugin.Options<unknown>,
  )

declare namespace Adapter {
  type options = Framework.Extension['options']
  type make = Framework.Extension['make']
  type when = Framework.Extension['when']
}
