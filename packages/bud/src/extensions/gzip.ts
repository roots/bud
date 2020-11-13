import CompressionPlugin from 'compression-webpack-plugin'
import {Extension} from '@roots/bud-extensions'

export const make: Make = opt => new CompressionPlugin(opt.all())
export const when: When = ({features}) =>
  features?.enabled('gzip')
export const options: RawOptions = {
  algorithm: 'gzip',
  filename: '[name].gz',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

declare type Make = Extension.Make<Options>
declare type When = Extension.When<Options>
declare type Options = Extension.Options<RawOptions>
export declare type RawOptions = CompressionPlugin.Options<
  CompressionPlugin.ZlibOptions
>
