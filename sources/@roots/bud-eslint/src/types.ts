import * as Extension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: Extension.Api & Extension.BudEslint
  }

  interface Modules {
    '@roots/bud-eslint': Extension.BudEslint
  }
}
