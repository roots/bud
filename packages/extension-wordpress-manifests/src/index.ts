import {Extension} from '@roots/bud-typings'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

const mergedManifestExtension = [
  `@roots/merged-manifest-webpack-plugin`,
  {
    make: (_opts, bud) => new MergedManifestPlugin([
      bud.extensions.get('@roots/bud-entrypoints'),
      bud.extensions.get('@roots/bud-wordpress-externals'),
    ]),
  },
]

export const boot: Extension.Boot = ({use}) => {
  use([
    '@roots/bud-entrypoints',
    '@roots/bud-wordpress-externals',
    mergedManifestExtension,
  ])
}
