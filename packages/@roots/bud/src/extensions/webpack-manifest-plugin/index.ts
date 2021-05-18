import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Module} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack/types'

const extension: Module<WebpackPluginInstance, Options> = {
  name: 'webpack-manifest-plugin',

  options: app =>
    app.store.get('extension.webpackManifestPlugin'),

  make: (options, {publicPath}) => {
    const pluginOptions: Options = {
      publicPath: publicPath(),
      ...options.all(),
    }

    return new WebpackManifestPlugin(pluginOptions)
  },

  when: app => app.store.enabled('manifest'),
}

export default extension
export const {name, options, make, when} = extension
