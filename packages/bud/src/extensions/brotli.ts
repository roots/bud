import Plugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'
import {Extension} from '@roots/bud-typings'

export const options: RawOptions = {
  filename: '[name].br[query]',
  algorithm: 'brotliCompress',
  test: /\.js$|\.css$|\.html$|\.html$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export const make: Make = opt => new Plugin(opt.all())

export const when: When = ({features}) =>
  features.enabled('brotli')

declare type RawOptions = Extension.Options<
  Plugin.Options<BrotliOptions>
>
declare type Make = Extension.Make<
  Plugin,
  Plugin.Options<BrotliOptions>
>
declare type When = Extension.When
