import {Framework, Module} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const options: Module.Options<ManifestPlugin.Options> = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Module.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options, {store}: Framework) =>
  new ManifestPlugin({
    ...options.all(),
    publicPath: store.get('webpack.output.publicPath'),
  })

export const when: Module.When = ({store}) =>
  store.enabled('features.manifest')
