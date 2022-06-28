// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import BudTerser from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}

export default BudTerser
