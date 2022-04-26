// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds tailwindcss support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-framework/types'
import '@roots/bud-postcss/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}

import BudTailwindCss from './extension'
export default BudTailwindCss
