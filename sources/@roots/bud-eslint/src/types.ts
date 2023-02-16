/// <reference types="@roots/bud" />

import type {BudEslint} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: {
      enable: BudEslint[`enable`]
      get: BudEslint[`get`]
      getOption: BudEslint[`getOption`]
      getOptions: BudEslint[`getOptions`]
      set: BudEslint[`set`]
      setOption: BudEslint[`setOption`]
      setOptions: BudEslint[`setOptions`]
    }
  }

  interface Modules {
    '@roots/bud-eslint': Bud[`eslint`]
  }
}
