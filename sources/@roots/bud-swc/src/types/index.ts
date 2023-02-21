/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-extensions" />

import type {Build} from '@roots/bud-framework/services'
import type BudSWC from '@roots/bud-swc'

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
    'swc-js': Build.Item
  }

  interface Rules {
    js: Build.Rule
    ts: Build.Rule
  }
}
