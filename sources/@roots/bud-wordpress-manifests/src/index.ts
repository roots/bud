// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * {@link @roots/merged-manifest-webpack-plugin# | @roots/merged-manifest-webpack-plugin} adapter
 *
 * @remarks
 * Wordpress manifests are a JSON representation of assets which will
 * need to be enqueued using WordPress PHP APIs for inclusion in a theme
 * or plugin.
 *
 * @see https://roots.io/bud

 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'
import {MergedManifestWebpackPlugin} from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': Extension.CompilerPlugin
    '@roots/merged-manifest-webpack-plugin': Extension.CompilerPlugin
  }
}

const BudMergedManifestAdapter: Extension.CompilerPlugin<
  MergedManifestWebpackPlugin,
  null
> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestWebpackPlugin(),
}

export const {name, make} = BudMergedManifestAdapter
