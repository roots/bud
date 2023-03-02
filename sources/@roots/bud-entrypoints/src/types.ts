/// <reference types="@roots/bud-framework" />

import type {BudEntrypoints} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    entrypoints: {
      get: BudEntrypoints[`get`]
      getOption: BudEntrypoints[`getOption`]
      getOptions: BudEntrypoints[`getOptions`]
      set: BudEntrypoints[`set`]
      setOption: BudEntrypoints[`setOption`]
      setOptions: BudEntrypoints[`setOptions`]
      enable: BudEntrypoints[`enable`]
    }
  }
  interface Modules {
    '@roots/bud-entrypoints': Bud[`entrypoints`]
  }
}
