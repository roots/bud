import {Framework, Module} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const name = `webpack-manifest-plugin`

export const options: Options = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Make = (options: Options, app: Framework) =>
  new ManifestPlugin({
    publicPath: app.subscribe('location/publicPath'),
    ...options.all(),
  })

export const when: When = (app: Framework) =>
  app.store.enabled('options.manifest')

declare type Make = Module.Make<
  ManifestPlugin,
  ManifestPlugin.Options
>

declare type When = Module.When
declare type Options = ManifestPlugin.Options
