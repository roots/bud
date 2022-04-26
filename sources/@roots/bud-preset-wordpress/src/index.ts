// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Preset config for WordPress plugins & themes.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-api/types'
import '@roots/bud-preset-recommend/types'
import '@roots/bud-react/types'
import '@roots/bud-wordpress-dependencies/types'
import '@roots/bud-wordpress-externals/types'
import '@roots/bud-wordpress-manifests/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
  }
}

import BudPresetWordPress from './extension'
export default BudPresetWordPress
