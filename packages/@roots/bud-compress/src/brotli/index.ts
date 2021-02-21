import {Bud} from '@roots/bud'
import Plugin from 'compression-webpack-plugin'
import * as api from './api'

export const name = 'compression-webpack-plugin-brotli'

export const make: Bud.Compress.Brotli.Make = options =>
  new Plugin(options.all())

export const when: Bud.Compress.Brotli.When = ({options}) =>
  options.enabled('brotli')

export const options: Bud.Compress.Brotli.Options = {
  filename: '[name].br[query]',
  algorithm: 'brotliCompress',
  test: /\.js$|\.css$|\.html$|\.htm$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

export {api}
