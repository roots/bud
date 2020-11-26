import {Bud, Extension} from '@roots/bud-typings'
import ManifestPlugin from 'webpack-manifest-plugin'

export const options: Extension.RawOptions<ManifestPlugin.Options> = {
  fileName: 'manifest.json',
  writeToFileEmit: true,
}

export const make: Extension.Make<
  ManifestPlugin,
  ManifestPlugin.Options
> = (options: ManifestPlugin.Options, {config}: Bud.Bud) =>
  new ManifestPlugin({
    ...options.all(),
    publicPath: config.get('output.publicPath'),
  })

export const when: Extension.When = ({features}) =>
  features.enabled('manifest')
