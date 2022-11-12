/// <reference path="../../bud/lib/index.d.ts" />

import type {BudImagemin} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImagemin
  }

  interface Modules {
    '@roots/bud-imagemin': BudImagemin
  }
}
