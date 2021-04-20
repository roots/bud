import {Module} from '@roots/bud-framework'
import Plugin from 'compression-webpack-plugin'

export const name: Module['name'] =
  'compression-webpack-plugin-gzip'

export * as api from './api'

export const when: Module.When = app => app.store.enabled('gzip')

export const options: Module.Options = {
  algorithm: 'gzip',
  filename: '[name][ext].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export const make: Module.Make = options =>
  new Plugin(options.all())
