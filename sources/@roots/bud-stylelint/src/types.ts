/// <reference types="@roots/bud" />

import type BudStylelint from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: BudStylelint
  }

  interface Modules {
    '@roots/bud-stylelint': BudStylelint
  }
}
