// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://rootss.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

declare module '@roots/bud-framework' {
  interface Bud {
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}

import BudTerser from './extension'
export default BudTerser
