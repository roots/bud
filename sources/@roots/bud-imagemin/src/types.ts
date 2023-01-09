/// <reference types="@roots/bud" />

import type {BudImageminExtension} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImageminExtension
  }

  interface Modules {
    '@roots/bud-imagemin': BudImageminExtension
  }
}
