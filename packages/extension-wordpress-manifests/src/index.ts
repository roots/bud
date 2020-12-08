import Plugin from '@roots/merged-manifest-webpack-plugin'
import type {Extension} from '@roots/bud-typings'

const mergedManifestExtension = [
  '@roots/merged-manifest-webpack-plugin',
  {make: () => new Plugin()},
]

export const boot: Extension.Boot = ({use}) => {
  use([
    '@roots/bud-entrypoints',
    '@roots/bud-wordpress-externals',
    mergedManifestExtension,
  ])
}
