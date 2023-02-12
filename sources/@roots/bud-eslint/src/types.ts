/// <reference types="@roots/bud" />

import type {BudEslint} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: {
      enable: BudEslint[`enable`]
      get: BudEslint[`get`]
      set: BudEslint[`set`]
    }
  }

  interface Modules {
    '@roots/bud-eslint': BudEslint
  }
}
