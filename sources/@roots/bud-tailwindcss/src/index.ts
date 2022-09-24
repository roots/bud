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

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: BudTailwindCss
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}

import BudTailwindCss from './extension.js'
export default BudTailwindCss
