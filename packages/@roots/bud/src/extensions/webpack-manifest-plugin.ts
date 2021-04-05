import {WebpackManifestPlugin} from 'webpack-manifest-plugin'
import {Framework, Module} from '@roots/bud-framework'

export const name = `webpack-manifest-plugin`

export const options: WebpackManifestPlugin.Options = (
  app: Framework,
) => ({
  fileName: 'manifest.json',
  writeToFileEmit: true,
})

export const make: Module.Make<
  WebpackManifestPlugin,
  WebpackManifestPlugin.Options
> = (options: WebpackManifestPlugin.Options, app: Framework) =>
  new WebpackManifestPlugin({
    publicPath: app.subscribe('location/publicPath'),
    ...options.all(),
  })

export const when: Module.When = (app: Framework) =>
  app.store.enabled('options.manifest')
