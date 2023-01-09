/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-extensions" />

import type {Build} from '@roots/bud-framework/services'
import type BudSWC from '@roots/bud-swc/extension'

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
    js: Build.Rule
    ts: Build.Rule
  }
}
