import {Framework, Module} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const options: Module.RawOptions<ManifestPlugin.Options> = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Module.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options, {config}: Framework) =>
  new ManifestPlugin({
    ...options.all(),
    publicPath: config.get('output.publicPath'),
  })

export const when: Module.When = ({features}) =>
  features.enabled('manifest')
