/// <reference path="../../bud/lib/index.d.ts" />

import type {BudImageminExtension} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImageminExtension
  }

  interface Modules {
    '@roots/bud-imagemin': BudImageminExtension
  }
}
