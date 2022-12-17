/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-build/lib/index.d.ts" />

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Plugin, Processor} from 'postcss'

import type {BudPostCss} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCss
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
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
