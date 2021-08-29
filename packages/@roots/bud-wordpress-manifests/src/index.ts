import {WebpackPlugin} from '@roots/bud-framework'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-wordpress-manifests': WebpackPlugin
      '@roots/merged-manifest-webpack-plugin': WebpackPlugin
    }
  }
}

const extension: WebpackPlugin<MergedManifestPlugin, null> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestPlugin(),
}

export const {name, make} = extension
