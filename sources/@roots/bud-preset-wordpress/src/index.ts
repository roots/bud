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
