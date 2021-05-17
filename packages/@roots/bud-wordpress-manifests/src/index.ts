import './interface'
import type {Module} from '@roots/bud-framework'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

const extension: Module<MergedManifestPlugin, null> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestPlugin(),
}

export const {name, make} = extension
