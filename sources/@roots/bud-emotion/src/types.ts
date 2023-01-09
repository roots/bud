/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-babel" />
/// <reference types="@roots/bud-swc" />

import type {BudEmotion} from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotion
  }
}
