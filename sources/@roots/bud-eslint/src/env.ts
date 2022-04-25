import BudEslint from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: BudEslint
  }

  interface Modules {
    '@roots/bud-eslint': BudEslint
  }
}
