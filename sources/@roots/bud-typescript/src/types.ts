/// <reference path="../../bud-babel/lib/index.d.ts" />
/// <reference path="../../bud/lib/index.d.ts" />

import type {Item, Loader, Rule} from '@roots/bud-framework'

import type BudTypeScript from './extension.js'
import type BudTypeCheckPlugin from './typecheck/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    typescript: BudTypeScript
  }

  interface Modules {
    '@roots/bud-typescript': BudTypeScript
    '@roots/bud-typescript/typecheck': BudTypeCheckPlugin
  }

  interface Loaders {
    ts: Loader
  }

  interface Items {
    ts: Item
  }

  interface Rules {
    ts: Rule
  }
}
