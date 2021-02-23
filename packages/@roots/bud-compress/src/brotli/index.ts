import {Framework} from '@roots/bud-framework'
import Plugin from 'compression-webpack-plugin'
import * as api from './api'

export const name = 'compression-webpack-plugin-brotli'

export const make: Framework.Compress.Brotli.Make = options =>
  new Plugin(options.all())

export const when: Framework.Compress.Brotli.When = ({
  options,
}) => options.enabled('brotli')

export const options: Framework.Compress.Brotli.Options = {
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
