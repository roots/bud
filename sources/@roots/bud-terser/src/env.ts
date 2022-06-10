import BudTerser from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}
