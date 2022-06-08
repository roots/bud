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

import '@roots/bud-api'
import '@roots/bud-preset-recommend'
import '@roots/bud-react'
import '@roots/bud-wordpress-dependencies'
import '@roots/bud-wordpress-externals'
import '@roots/bud-wordpress-manifests'

import BudPresetWordPress from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    wordpress: BudPresetWordPress
  }
  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
  }
}

export default BudPresetWordPress
