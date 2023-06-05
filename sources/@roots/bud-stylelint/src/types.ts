import type {BudStylelintPublicApi} from './api.js'
import type {default as BudStylelint} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: BudStylelintPublicApi
  }

  interface Modules {
    '@roots/bud-stylelint': BudStylelint
  }
}
