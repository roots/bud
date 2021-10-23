// Copyright (c) Roots Foundation, LLC. All rights reserved.
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

 * @packageDocumentation @betaDocumentation
 */

import {Extension} from '@roots/bud-framework'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   *
   * @public @override
   */
  interface Modules {
    '@roots/bud-wordpress-manifests': Extension.CompilerPlugin
    '@roots/merged-manifest-webpack-plugin': Extension.CompilerPlugin
  }
}

const BudMergedManifestAdapter: Extension.CompilerPlugin<
  MergedManifestPlugin,
  null
> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestPlugin(),
}

export const {name, make} = BudMergedManifestAdapter
