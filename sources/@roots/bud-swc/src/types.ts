import type {Build} from '@roots/bud-framework/services'

import type BudSWC from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    swc: BudSWC
  }

  interface Modules {
    '@roots/bud-swc': BudSWC
  }

  interface Loaders {
    swc: Build.Loader
  }

  interface Items {
    swc: Build.Item
  }

  interface Rules {
    js: Build.Rule.Interface
    ts: Build.Rule.Interface
  }
}
