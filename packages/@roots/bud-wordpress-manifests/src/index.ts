import {Module} from '@roots/bud-framework'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-wordpress-manifests': Module
      '@roots/merged-manifest-webpack-plugin': Module
    }
  }
}

const extension: Module<MergedManifestPlugin, null> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestPlugin(),
}

export const {name, make} = extension
