/**
 * Add sass support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {Item, Loader, Rule} from '@roots/bud-framework'
import type BudResolveUrl from '@roots/bud-sass/resolve-url'

import {BudSass, type BudSassApi} from '@roots/bud-sass/extension'

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

export default BudSass
