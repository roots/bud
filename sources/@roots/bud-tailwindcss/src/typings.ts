import '@roots/bud-postcss'

import BudTailwindCss from './tailwind.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}
