/* eslint-disable prettier/prettier */
import CompressionPlugin from 'compression-webpack-plugin'
import type {Make, Options, When} from './typings'

export * as api from './api'

export const when: When = app => app.options.enabled('gzip')

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

export const make: Make = options =>
  new CompressionPlugin(options.all())
