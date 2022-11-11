/// <reference path="../../bud/lib/index.d.ts" />

import type {extractCss} from './api/extract.js'
import type BudCriticalCssExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: BudCriticalCssExtension
    extractCss: extractCss
  }

  interface Modules {
    '@roots/bud-criticalcss': BudCriticalCssExtension
  }
}
