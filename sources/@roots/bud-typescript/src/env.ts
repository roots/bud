import * as Build from '@roots/bud-framework/services/build'

import BudTypeScript from './extension.js'
import BudTypeCheckPlugin from './typecheck/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    typescript: BudTypeScript
  }

  interface Modules {
    '@roots/bud-typescript': BudTypeScript
    '@roots/bud-typescript/typecheck': BudTypeCheckPlugin
  }

  interface Loaders {
    ts: Build.Loader
  }

  interface Items {
    ts: Build.Item
  }

  interface Rules {
    ts: Build.Rule
  }
}
