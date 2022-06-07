import '@roots/bud-framework'

import BudStylelint from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: BudStylelint
  }

  interface Modules {
    '@roots/bud-stylelint': BudStylelint
  }
}
