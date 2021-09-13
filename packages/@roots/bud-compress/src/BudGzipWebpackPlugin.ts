import type {Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

interface BudGzipWebpackPlugin
  extends Extension.CompilerPlugin<
    Plugin,
    BudCompressionExtension.Options
  > {}

const name: BudGzipWebpackPlugin['name'] =
  'bud-gzip-webpack-plugin'

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
    this.store.set('gzip', true)

    options &&
      this.hooks.on(
        'extension/compression-webpack-plugin-gzip/options',
        () => options,
      )

    return this
  },
}

const BudGzipWebpackPlugin: BudGzipWebpackPlugin = {
  name,
  options,
  make,
  api,
}

export {BudGzipWebpackPlugin}
