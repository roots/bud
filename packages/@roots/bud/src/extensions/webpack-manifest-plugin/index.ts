import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Plugin} from '@roots/bud-framework'

const extension: Plugin<{apply: any}, Options> = {
  name: 'webpack-manifest-plugin',
  options: app =>
    app.store.get('extension.webpackManifestPlugin'),
  make: (options, {publicPath, store}) =>
    new WebpackManifestPlugin({
      ...options,
      publicPath: publicPath(),
      /* seed: store.repository.extension.webpackManifestPlugin
        .assets, */
    }),

  when: app => app.store.isTrue('manifest'),
}

export default extension
export const {name, options, make, when} = extension
