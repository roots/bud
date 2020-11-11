import WordPressExternalsWebpackPlugin from '@roots/wordpress-externals-webpack-plugin'
import EntrypointsWebpackPlugin from '@roots/entrypoints-webpack-plugin'
import MergedManifestWebpackPlugin from '@roots/merged-manifest-webpack-plugin'
import {Bud} from '@roots/bud-typings'

export const boot = (bud: Bud) => {
  Object.entries({
    [`@roots/wordpress-externals-webpack-plugin`]: WordPressExternalsWebpackPlugin,
    [`@roots/entrypoints-webpack-plugin`]: EntrypointsWebpackPlugin,
    [`@roots/merged-manifest-webpack-plugin`]: MergedManifestWebpackPlugin,
  }).map(([label, Plugin]) => {
    bud.extensions.set(label, {
      make: new Plugin(),
    })
  })
}
