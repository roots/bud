import '@roots/bud-framework'

import type {Config} from './config.js'
import type BabelExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  namespace Services.Build {
    interface Loaders {
      babel: any
    }

    interface Items {
      babel: any
    }
  }
}
