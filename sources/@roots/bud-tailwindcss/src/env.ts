import BudTailwindCss from './extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
  }
}
