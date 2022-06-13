import type BudTailwindCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}
