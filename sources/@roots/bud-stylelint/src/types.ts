/// <reference types="@roots/bud" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type BudStylelint from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: PublicApi
  }

  interface Modules {
    '@roots/bud-stylelint': PublicApi
  }
}

interface PublicApi extends PublicExtensionApi<BudStylelint> {
  failOnError: BudStylelint['failOnError']
  failOnWarning: BudStylelint['failOnWarning']
}
