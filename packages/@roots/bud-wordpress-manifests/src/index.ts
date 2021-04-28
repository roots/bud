import './interface'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'
import {Module} from '@roots/bud-framework'

export const name: Module['name'] =
  '@roots/bud-wordpress-manifests'

export const boot: Module.Boot = ({extensions}): void => {
  extensions.add({
    name: '@roots/merged-manifest-webpack-plugin',
    make: () => new MergedManifestPlugin(),
  })
}
