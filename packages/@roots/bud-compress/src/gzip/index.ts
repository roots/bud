import {Framework} from '@roots/bud-framework'
import Plugin from 'compression-webpack-plugin'

export const name = 'compression-webpack-plugin-gzip'

export * as api from './api'

export const when: Framework.Compress.Gzip.When = app =>
  app.options.enabled('gzip')

export const options: Framework.Compress.Gzip.Options = {
  algorithm: 'gzip',
  filename: '[name][ext].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export const make: Framework.Compress.Gzip.Make = options =>
  new Plugin(options.all())
