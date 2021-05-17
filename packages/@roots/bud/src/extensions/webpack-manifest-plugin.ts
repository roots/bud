import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Module} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack'

const extension: Module<WebpackPluginInstance, Options> = {
  name: 'webpack-manifest-plugin',
  options: app =>
    app.store.get('extension.webpackManifestPlugin'),
  make: (options, app) => {
    const pluginOptions: Options = {
      publicPath: app.publicPath(),
      ...options.all(),
    }

    return new WebpackManifestPlugin(pluginOptions)
  },
  when: app => app.store.enabled('manifest'),
}

export const {name, options, make, when} = extension
