import type {Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudGzipWebpackPlugin
  extends Extension.Plugin<
    Plugin,
    BudCompressionExtension.Options
  > {}

const name: BudGzipWebpackPlugin['name'] = 'bud-gzip-webpack-plugin'

const options: BudGzipWebpackPlugin['options'] = {
  algorithm: 'gzip',
  filename: '[name].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
}

const make: BudGzipWebpackPlugin['make'] = options =>
  new Plugin(options.all())

const api: BudGzipWebpackPlugin['api'] = {
  gzip: function (options) {
    this.store.set('features.gzip', true)

    if (options)
      this.extensions
        .get('compression-webpack-plugin-gzip')
        .setOptions(options)

    return this
  },
}

const when = ({store}) => store.is('features.gzip', true)

const BudGzipWebpackPlugin: BudGzipWebpackPlugin = {
  name,
  options,
  make,
  api,
  when,
}

export {BudGzipWebpackPlugin}
