/// <reference types="@roots/bud" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {BudEslint} from './extension.js'

interface BudEslintPublicApi extends PublicExtensionApi<BudEslint> {
  cacheFix: BudEslint[`cacheFix`]
  fix: BudEslint[`fix`]
}

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: BudEslintPublicApi
  }

  interface Modules {
    '@roots/bud-eslint': BudEslintPublicApi
  }
}
