import {Plugin} from '@roots/bud-framework'
import {
  ManifestPluginOptions as Options,
  WebpackManifestPlugin,
} from 'webpack-manifest-plugin'

const extension: Plugin<{apply: any}, Options> = {
  name: 'webpack-manifest-plugin',

  options: ({store}) =>
    store.get<Options>('extension.webpackManifestPlugin'),

  make: (options, {store}) => {
    return new WebpackManifestPlugin({
      publicPath: store.get('location.publicPath'),
      ...options.all(),
    })
  },

  when: app => app.store.isTrue('manifest'),
}

export default extension
export const {name, options, make, when} = extension
