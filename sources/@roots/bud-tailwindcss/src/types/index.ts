import '@roots/bud'
import '@roots/bud-postcss'

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {BudTailwindCss} from '../extension/index.js'

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
