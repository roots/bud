import CompressionPlugin from 'compression-webpack-plugin'
import {Extension} from '@roots/bud-typings'

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

export const make: Extension.Make = (options: GzipOptions) =>
  new CompressionPlugin(options)

export const when: Extension.When = ({features}) =>
  features.get('gzip') === true

export declare type GzipOptions = CompressionPlugin.Options<
  CompressionPlugin.ZlibOptions
>
