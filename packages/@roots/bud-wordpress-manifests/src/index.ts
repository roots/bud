import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'
import {Module} from '@roots/bud-typings'

// Extension identifier
export const name: Module['name'] =
  '@roots/bud-wordpress-manifests'

// Extension webpack plugins
export const boot: Module.Boot = ({extensions}): void => {
  extensions.add('@roots/merged-manifest-webpack-plugin', {
    name: '@roots/merged-manifest-webpack-plugin',
    make: () => new MergedManifestPlugin(),
  })
}
