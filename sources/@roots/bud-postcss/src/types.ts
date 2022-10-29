import type {Build} from '@roots/bud-framework/services'
import type {Plugin, Processor} from 'postcss'

import type BudPostCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCss
  }

  interface Loaders {
    postcss: Build.Loader
  }

  interface Items {
    postcss: Build.Item
  }

  interface Modules {
    '@roots/bud-postcss': BudPostCss
  }

  namespace Registry {
    interface Sync {
      'postcss.plugins': () => Array<[string | Plugin | Processor, any?]>
    }
  }
}
