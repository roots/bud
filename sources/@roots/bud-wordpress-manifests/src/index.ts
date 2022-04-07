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
 * @see https://bud.js.org

 * @packageDocumentation
 */

import {Extensions} from '@roots/bud-framework'
import {MergedManifestWebpackPlugin} from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': Extensions.Plugin
    '@roots/merged-manifest-webpack-plugin': Extensions.Plugin
  }
}

const BudMergedManifestAdapter: Extensions.Plugin<
  MergedManifestWebpackPlugin,
  null
> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestWebpackPlugin(),
}

export const {name, make} = BudMergedManifestAdapter
