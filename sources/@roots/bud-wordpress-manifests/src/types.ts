/// <reference path="../../bud-entrypoints/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-dependencies/lib/index.d.ts" />
/// <reference path="../../bud-wordpress-externals/lib/index.d.ts" />
/// <reference path="../../merged-manifest-webpack-plugin/lib/index.d.ts" />

import type BudWordPressManifestExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': BudWordPressManifestExtension
  }
}
