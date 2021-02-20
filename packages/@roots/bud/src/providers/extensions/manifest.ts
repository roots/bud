import {Framework, Module} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const options: Module.Options<ManifestPlugin.Options> = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Module.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options, app: Framework) =>
  new ManifestPlugin({
    ...options.all(),
    publicPath: app.options.get('publicPath'),
  })

export const when: Module.When = ({options}) =>
  options.enabled('manifest')
