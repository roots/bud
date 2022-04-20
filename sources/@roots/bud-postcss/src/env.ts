import type {Build} from '@roots/bud-framework'

import BudPostCss from './extension'

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
