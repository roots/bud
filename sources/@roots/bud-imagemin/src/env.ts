import BudImagemin from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImagemin
  }

  interface Modules {
    '@roots/bud-imagemin': BudImagemin
  }
}
