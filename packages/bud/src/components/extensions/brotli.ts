import Plugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'
import {Container, Extension} from '@roots/bud-typings'

export const options: Plugin.Options<BrotliOptions> = {
  filename: '[path].br[query]',
  algorithm: 'brotliCompress',
  test: /\.js$|\.css$|\.html$|\.html$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export const make: Make = opt => new Plugin(opt.getStore())

export const when: When = ({features}) =>
  features.is('brotli', true)

export type Make = Extension.Make<
  Plugin,
  Container<Plugin.Options<BrotliOptions>>
>

export type When = Extension.When
