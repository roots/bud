import {Framework, Module} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const name = `webpack-manifest-plugin`

export const options: ManifestPlugin.Options = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Module.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options, app: Framework) =>
  new ManifestPlugin({
    publicPath: app.subscribe('location/publicPath'),
    ...options.all(),
  })

export const when: Module.When = (app: Framework) =>
  app.store.enabled('options.manifest')
