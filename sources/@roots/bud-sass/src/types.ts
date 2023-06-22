import type {Item, Loader, Rule} from '@roots/bud-framework'

import type {BudSass, BudSassApi} from './extension.js'
import type {BudResolveUrl} from './resolve-url/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    sass: BudSassApi
  }

  interface Modules {
    '@roots/bud-sass': BudSass
    '@roots/bud-sass/resolve-url': BudResolveUrl
  }

  interface Loaders {
    'resolve-url': Loader
    sass: Loader
  }

  interface Items {
    'resolve-url': Item
    sass: Item
  }

  interface Rules {
    sass: Rule
  }
}
