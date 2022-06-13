import type {Item, Loader} from '@roots/bud-build'

import type BudMDX from './extension.js'

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

  interface Patterns {
    mdx: RegExp
  }

  interface Modules {
    '@roots/bud-mdx': BudMDX
  }
}
