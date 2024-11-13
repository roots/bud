// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * @roots/bud-tailwindcss
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import {
  BudTailwindCss,
  type BudTailwindOptionsPublicInterface,
} from '@roots/bud-tailwindcss/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: BudTailwindCss & BudTailwindOptionsPublicInterface
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
    '@roots/bud-tailwindcss/virtual-module': any
  }
}

export {BudTailwindCss as default} from '@roots/bud-tailwindcss/extension'
