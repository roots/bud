import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Module} from '@roots/bud-framework'

const extension: Module = {
  name: 'webpack-manifest-plugin',

  options: app =>
    app.store.get('extension.webpackManifestPlugin'),

  make: (options, {publicPath}) => {
    const pluginOptions: Options = {
      publicPath: publicPath(),
      ...options.all(),
    }

    const plugin = new WebpackManifestPlugin(pluginOptions)

    return plugin
  },

  when: app => app.store.isTrue('manifest'),
}

export default extension
export const {name, options, make, when} = extension
