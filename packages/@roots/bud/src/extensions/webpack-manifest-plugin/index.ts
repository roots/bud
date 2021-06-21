import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Plugin} from '@roots/bud-framework'

const extension: Plugin<{apply: any}, Options> = {
  name: 'webpack-manifest-plugin',

  options: app =>
    app.store.get('extension.webpackManifestPlugin'),

  make: (options, {parent, publicPath}) =>
    new WebpackManifestPlugin({
      ...parent.extensions.get('webpack-manifest-plugin')
        .options,
      publicPath: parent.publicPath(),
      seed: parent.store.repository.extension
        .webpackManifestPlugin.assets,
    }),

  when: app => app.store.isTrue('manifest'),
}

export default extension
export const {name, options, make, when} = extension
