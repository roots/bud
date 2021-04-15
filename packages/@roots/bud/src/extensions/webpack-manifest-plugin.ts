import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Framework, Module} from '@roots/bud-framework'
import {WebpackPluginInstance} from 'webpack'

export const name = `webpack-manifest-plugin`

export const options: Module.Options<Options> = () => ({
  fileName: 'manifest.json',
  writeToFileEmit: true,
})

export const make: Module.Make<
  WebpackPluginInstance,
  Options
> = (options, app) => {
  const pluginOptions: Options = {
    publicPath: app.subscribe('location/publicPath'),
    ...options.all(),
  }

  return new WebpackManifestPlugin(pluginOptions)
}

export const when: Module.When<Framework> = (app: Framework) =>
  app.store.enabled('options.manifest')
