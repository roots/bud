import type {Build} from '@roots/bud-framework'

import type BudPostCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCss
  }

  interface Modules {
    '@roots/bud-postcss': BudPostCss
  }

  interface Loaders {
    postcss: Build.Loader
  }

  interface Items {
    postcss: Build.Item
  }
}
