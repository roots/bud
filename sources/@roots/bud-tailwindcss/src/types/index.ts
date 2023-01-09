/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-postcss" />

import type {BudTailwindCss} from '@roots/bud-tailwindcss/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: BudTailwindCss
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
    '@roots/bud-tailwindcss/virtual-module'?: any
  }
}
