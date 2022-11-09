/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-postcss/lib/index.d.ts" />

import type BudTailwindCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: BudTailwindCss
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
    '@roots/bud-tailwindcss/virtual-module'?: any
  }
}
