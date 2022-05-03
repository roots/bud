import BudTerser from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    terser: BudTerser
  }

  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}
