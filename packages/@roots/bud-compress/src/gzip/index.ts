import {Bud} from '@roots/bud'
import Plugin from 'compression-webpack-plugin'

export const name = 'compression-webpack-plugin-gzip'

export * as api from './api'

export const when: Bud.Compress.Gzip.When = app =>
  app.options.enabled('gzip')

export const options: Bud.Compress.Gzip.Options = {
  algorithm: 'gzip',
  filename: '[name][ext].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export const make: Bud.Compress.Gzip.Make = options =>
  new Plugin(options.all())
