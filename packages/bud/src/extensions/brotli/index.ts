import Plugin from 'compression-webpack-plugin'
import type {Make, Options, When} from './typings'

export const make: Make = options => new Plugin(options.all())

export const when: When = ({features}) =>
  features.is('brotli', true)

export const options: Options = {
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
