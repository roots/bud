import BudEslint from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: BudEslint
  }

  interface Modules {
    'eslint-webpack-plugin': BudEslint
  }
}
