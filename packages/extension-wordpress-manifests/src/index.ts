import {Extension} from '@roots/bud-typings'
import WordPressExternalsWebpackPlugin from '@roots/wordpress-externals-webpack-plugin'
import EntrypointsWebpackPlugin from '@roots/entrypoints-webpack-plugin'
import MergedManifestWebpackPlugin from '@roots/merged-manifest-webpack-plugin'

export const boot: Extension.Boot = bud => {
  Object.entries({
    [`@roots/wordpress-externals-webpack-plugin`]: WordPressExternalsWebpackPlugin,
    [`@roots/entrypoints-webpack-plugin`]: EntrypointsWebpackPlugin,
    [`@roots/merged-manifest-webpack-plugin`]: MergedManifestWebpackPlugin,
  }).map(([label, Plugin]) => {
    bud.use([
      label,
      {
        make: new Plugin(),
      },
    ])
  })
}
