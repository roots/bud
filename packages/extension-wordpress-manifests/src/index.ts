import Plugin from '@roots/merged-manifest-webpack-plugin'
import {Extension} from '@roots/bud-typings'

/**
 * @roots/merged-manifest-webpack-plugin loadable
 */
const mergedManifestExtension = [
  '@roots/merged-manifest-webpack-plugin',
  {
    make: (_opts, bud) =>
      new Plugin({
        entrypointsName: bud.extensions
          .get('@roots/bud-entrypoints')
          .get('name'),
        wordpressName: bud.extensions
          .get('@roots/bud-wordpress-externals')
          .get('name'),
        file: 'entrypoints.json',
      }),
  },
]

/**
 * @roots/bud-wordpress-manifests boot
 */
export const boot: Extension.Module.Boot = ({use}) => {
  use([
    '@roots/bud-entrypoints',
    '@roots/bud-wordpress-externals',
    mergedManifestExtension,
  ])
}
