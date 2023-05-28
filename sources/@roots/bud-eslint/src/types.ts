import {type Api, type BudEslint} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: Api & BudEslint
  }
  interface Modules {
    '@roots/bud-eslint': BudEslint
  }
}

declare module '@roots/bud' {
  interface Bud {
    eslint: Api & BudEslint
  }
  interface Modules {
    '@roots/bud-eslint': BudEslint
  }
}
