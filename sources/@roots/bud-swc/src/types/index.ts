import type {Build} from '@roots/bud-framework/services'

import type {BudSWC, BudSWCPublicInterface} from '../extension/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    swc: BudSWCPublicInterface
  }

  interface Modules {
    '@roots/bud-swc': BudSWC
  }

  interface Loaders {
    swc: Build.Loader
  }

  interface Items {
    'swc-ecmascript': Build.Item
    'swc-typescript': Build.Item
  }

  interface Rules {
    js: Build.Rule
    ts: Build.Rule
  }
}

declare module '@roots/bud' {
  interface Bud {
    swc: BudSWCPublicInterface
  }

  interface Modules {
    '@roots/bud-swc': BudSWC
  }

  interface Loaders {
    swc: Build.Loader
  }

  interface Items {
    'swc-ecmascript': Build.Item
    'swc-typescript': Build.Item
  }

  interface Rules {
    js: Build.Rule
    ts: Build.Rule
  }
}
