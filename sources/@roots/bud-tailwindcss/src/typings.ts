import '@roots/bud-postcss'

import {BudTailwindCssExtension} from './tailwind.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCssExtension
  }
}
