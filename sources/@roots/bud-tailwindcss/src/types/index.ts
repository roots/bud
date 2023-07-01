import type {
  BudTailwindCss,
  BudTailwindOptionsPublicInterface,
} from '../extension/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    tailwind: BudTailwindOptionsPublicInterface & BudTailwindCss
  }

  interface Modules {
    '@roots/bud-tailwindcss': BudTailwindCss
    '@roots/bud-tailwindcss/virtual-module': any
  }
}
