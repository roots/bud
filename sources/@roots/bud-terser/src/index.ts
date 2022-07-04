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

import type BudMinimizeCss from './css-minimizer/extension.js'
import BudTerser from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    minimizeCss: BudMinimizeCss
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
    '@roots/bud-terser/css-minimizer': BudMinimizeCss
  }
}

export default BudTerser
