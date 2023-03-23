/// <reference types="@roots/bud-entrypoints" />
/// <reference types="@roots/bud-wordpress-dependencies" />
/// <reference types="@roots/bud-wordpress-externals" />
/// <reference types="@roots/merged-manifest-webpack-plugin" />

import '@roots/bud/types'
import '@roots/bud-wordpress-dependencies/types'
import '@roots/bud-wordpress-externals/types'
import '@roots/merged-manifest-webpack-plugin/types'

import type BudWordPressManifestExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': BudWordPressManifestExtension
  }
}
