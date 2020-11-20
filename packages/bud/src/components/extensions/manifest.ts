import {Extension} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const options: Extension.RawOptions<ManifestPlugin.Options> = ({
  config,
}) => ({
  publicPath: config.get('output.publicPath'),
  fileName: 'manifest.json',
  writeToFileEmit: true,
})

export const make: Extension.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options) =>
  new ManifestPlugin(options.all())

export const when: Extension.When = ({features}) =>
  features.enabled('manifest')
