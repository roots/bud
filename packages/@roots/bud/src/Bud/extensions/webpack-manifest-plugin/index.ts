import type {Module} from '@roots/bud-framework'
import {
  ManifestPluginOptions as Options,
  WebpackManifestPlugin,
} from 'webpack-manifest-plugin'

interface extension extends Module<{apply: any}, Options> {}

const extension = {
  name: 'webpack-manifest-plugin',

  options: ({store}) =>
    store.get('extension.webpackManifestPlugin'),

  make: (options, {store}) => {
    return new WebpackManifestPlugin({
      publicPath: store.get('location.publicPath'),
      ...options.all(),
    })
  },

  when: app => app.store.isTrue('manifest'),
}

export const {name, options, make, when} = extension
