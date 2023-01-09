/// <reference types="@roots/bud-framework" />

import type BudEntrypoints from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}
