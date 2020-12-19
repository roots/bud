import CompressionPlugin from 'compression-webpack-plugin'
import {Extension} from '@roots/bud-typings'

export const make: Extension.Module.Make = opt =>
  new CompressionPlugin(opt.all())

export const when: Extension.Module.When = ({features}) =>
  features.is('gzip', true)

export const options: Options = {
  algorithm: 'gzip',
  filename: '[name][ext].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export declare type Options = CompressionPlugin.Options<CompressionPlugin.ZlibOptions>
