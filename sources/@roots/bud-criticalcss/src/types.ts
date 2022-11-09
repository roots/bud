/// <reference path="../../bud/lib/index.d.ts" />

import type BudCriticalCssExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: BudCriticalCssExtension
  }

  interface Modules {
    '@roots/bud-criticalcss': BudCriticalCssExtension
  }
}
