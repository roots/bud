import CompressionPlugin from 'compression-webpack-plugin'

export const options: GzipOptions = {
  algorithm: 'gzip',
  filename: '[path].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export const make: Framework.Extension.Make = (
  options: GzipOptions,
) => new CompressionPlugin(options)

export const when: Framework.Extension.When = bud =>
  bud.features.get('gzip') === true

declare type GzipOptions = CompressionPlugin.Options<
  CompressionPlugin.ZlibOptions
>
