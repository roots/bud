import type BudTailwindCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwindcss: BudTailwindCss
  }
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}
