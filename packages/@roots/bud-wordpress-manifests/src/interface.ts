import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-wordpress-manifests': Module
      '@roots/merged-manifest-webpack-plugin': Module
    }
  }
}
