// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-wordpress-manifests
 *
 * @see https://bud.js.org
 */

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-manifests': BudWordPressManifestExtension
  }
}

import BudWordPressManifestExtension from './extension.js'

export default BudWordPressManifestExtension
