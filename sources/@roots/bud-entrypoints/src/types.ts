/// <reference types="@roots/bud-framework" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {BudEntrypoints} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    entrypoints: PublicExtensionApi<BudEntrypoints>
  }
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}
