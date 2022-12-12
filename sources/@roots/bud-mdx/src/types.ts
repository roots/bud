import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Rule} from '@roots/bud-build/rule'

import type {BudMDX} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    mdx: BudMDX
  }

  interface Loaders {
    mdx: Loader
  }

  interface Items {
    mdx: Item
  }

  interface Rules {
    mdx: Rule
  }

  interface Patterns {
    mdx: RegExp
  }

  interface Modules {
    '@roots/bud-mdx': BudMDX
  }
}
