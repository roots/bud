import Plugin from 'compression-webpack-plugin'
import type {Make, Options, When} from './typings'

export * as api from './api'

export const make: Make = options => new Plugin(options.all())

export const when: When = ({options}) =>
  options.enabled('brotli')

export const options: Options = {
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
