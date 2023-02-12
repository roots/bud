/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-postcss" />

import type {BudTailwindCss} from '@roots/bud-tailwindcss/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: {
      get: BudTailwindCss['get']
      getOptions: BudTailwindCss['getOptions']
      resolveThemeValue: BudTailwindCss['resolveThemeValue']
      set: BudTailwindCss['set']
      setOptions: BudTailwindCss['setOptions']
    }
  }

  interface Modules {
    '@roots/bud-tailwindcss': Bud[`tailwind`]
    '@roots/bud-tailwindcss/virtual-module'?: any
  }
}
