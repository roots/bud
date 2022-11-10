/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-babel/lib/index.d.ts" />
/// <reference path="../../bud-swc/lib/index.d.ts" />

import type {BudEmotion} from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotion
  }
}
