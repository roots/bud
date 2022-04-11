import type {Bud, Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

type BudGzipWebpackPlugin = Extension.Module<BudCompressionExtension.Options, Plugin>

const label: BudGzipWebpackPlugin['label'] =
  'compression-webpack-plugin-gzip'

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

const register: BudGzipWebpackPlugin['register'] = async app => {
  app.api.bindFacade('gzip', function (options) {
    const app = this as Bud

    app.hooks.on('feature.gzip', true)

    if (options)
      app.extensions
        .get('compression-webpack-plugin-gzip')
        .setOptions(options)

    return app
  })
}

const make: BudGzipWebpackPlugin['make'] = options =>
  new Plugin(options.all())

const when = ({hooks}) => hooks.filter('feature.gzip')

const BudGzipWebpackPlugin: BudGzipWebpackPlugin = {
  label,
  options,
  make,
  register,
  when,
}

export {BudGzipWebpackPlugin}
