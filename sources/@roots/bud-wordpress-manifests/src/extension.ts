// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Wordpress manifests are a JSON representation of assets which will
 * need to be enqueued using WordPress PHP APIs for inclusion in a theme
 * or plugin.
 *
 * @see https://bud.js.org

 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators/label'
import {plugin} from '@roots/bud-framework/extension/decorators/plugin'
import MergedManifestWebpackPlugin from '@roots/merged-manifest-webpack-plugin'

@label(`@roots/bud-wordpress-manifests`)
@plugin(MergedManifestWebpackPlugin)
export default class BudMergedManifestAdapter extends Extension<
  null,
  MergedManifestWebpackPlugin
> {}
