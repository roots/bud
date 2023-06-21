// eslint-disable-next-line n/no-unpublished-import
import type {Item, Loader, Rule} from '@roots/bud-build'

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
