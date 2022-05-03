import type {Build} from '@roots/bud-framework'

import type BudSass from './extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-sass': BudSass
  }

  interface Loaders {
    sass: Build.Loader
  }

  interface Items {
    sass: Build.Item
  }

  interface Rules {
    sass: Build.Rule
  }
}
