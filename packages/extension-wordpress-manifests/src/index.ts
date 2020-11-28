import {Extension} from '@roots/bud-typings'
import WordPressExternalsPlugin from '@roots/wordpress-externals-webpack-plugin'
import EntrypointsPlugin from '@roots/entrypoints-webpack-plugin'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

export const boot: Extension.Boot = bud => {
  Object.entries({
    [`@roots/wordpress-externals-webpack-plugin`]: WordPressExternalsPlugin,
    [`@roots/entrypoints-webpack-plugin`]: EntrypointsPlugin,
    [`@roots/merged-manifest-webpack-plugin`]: MergedManifestPlugin,
  }).map(([label, Plugin]) => {
    bud.use([
      label,
      {
        make: () => new Plugin(),
      },
    ])
  })
}
