import CompressionPlugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'
import {Extension} from '@roots/bud-extensions'

export const options: Options = {
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

export const make: Make = options =>
  new CompressionPlugin(options.all())

export const when: When = ({features}) =>
  features.enabled('brotli')

declare type Options = Extension.RawOptions<
  CompressionPlugin.Options<BrotliOptions>
>

declare type Make = Extension.Make<
  CompressionPlugin,
  CompressionPlugin.Options<BrotliOptions>
>

declare type When = Extension.When<BrotliOptions>
