/// <reference path="../../bud-framework/lib/index.d.ts" />

import type BudEntrypoints from '@roots/bud-entrypoints/extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}
