/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-postcss" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'
import type {BudTailwindCss} from '@roots/bud-tailwindcss/extension'

interface Extension extends PublicExtensionApi<BudTailwindCss> {
  generateImports: BudTailwindCss['generateImports']
  resolveThemeValue: BudTailwindCss['resolveThemeValue']
}

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: Extension
  }

  interface Modules {
    '@roots/bud-tailwindcss': Extension
    '@roots/bud-tailwindcss/virtual-module'?: any
  }
}
