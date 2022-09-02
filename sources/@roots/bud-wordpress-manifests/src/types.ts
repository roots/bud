import type BudWordPressManifestExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': BudWordPressManifestExtension
  }
}
