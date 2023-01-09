/// <reference types="@roots/bud-entrypoints" />
/// <reference types="@roots/bud-wordpress-dependencies" />
/// <reference types="@roots/bud-wordpress-externals" />
/// <reference types="@roots/merged-manifest-webpack-plugin" />

import type BudWordPressManifestExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': BudWordPressManifestExtension
  }
}
