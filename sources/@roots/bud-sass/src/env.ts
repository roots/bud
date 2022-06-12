import type {Build} from '@roots/bud-framework'

import type BudSass from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-sass': BudSass
  }

  interface Loaders {
    resolveUrl: Build.Loader
    sass: Build.Loader
  }

  interface Items {
    resolveUrl: Build.Item
    sass: Build.Item
  }

  interface Rules {
    sass: Build.Rule
  }
}
