import CompressionPlugin from 'compression-webpack-plugin'

export const options: GzipOptions = {
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.7,
  deleteOriginalAssets: false,
}

export const when: Framework.Extension.When = bud =>
  bud.features.get('gzip') === true

export const make: Framework.Extension.Make = (
  options: GzipOptions,
) => new CompressionPlugin(options)

declare type GzipOptions = CompressionPlugin.Options<
  CompressionPlugin.ZlibOptions
>
