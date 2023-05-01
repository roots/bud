/// <reference types="@roots/bud-postcss" />

import type {purgecss} from './api.js'
import type BudPurgeCSS from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: typeof purgecss
  }

  interface Modules {
    '@roots/bud-purgecss': BudPurgeCSS
  }
}
