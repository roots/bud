/// <reference types="@roots/bud" />

/* eslint-disable n/no-unpublished-import */
import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'

import type {BudPostCssPublicInterface} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCssPublicInterface
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
  }

  interface Modules {
    '@roots/bud-postcss': BudPostCssPublicInterface
  }
}
