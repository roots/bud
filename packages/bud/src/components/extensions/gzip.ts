import CompressionPlugin from 'compression-webpack-plugin'
import {Extension} from '@roots/bud-typings'

export const make: Extension.Make = opt =>
  new CompressionPlugin(opt.all())
export const when: Extension.When = ({features}) =>
  features?.enabled('gzip')
export const options: Options = {
  algorithm: 'gzip',
  filename: '[name].gz',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export declare type Options = CompressionPlugin.Options<
  CompressionPlugin.ZlibOptions
>
