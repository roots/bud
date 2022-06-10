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

import {Extension} from '@roots/bud-framework'
import {MergedManifestWebpackPlugin} from '@roots/merged-manifest-webpack-plugin'

export default class BudMergedManifestAdapter extends Extension<
  {},
  MergedManifestWebpackPlugin
> {
  public label = '@roots/bud-wordpress-manifests'
  public async make() {
    return new MergedManifestWebpackPlugin()
  }
}
