/**
 * Add sass support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-postcss'

import type {Item, Loader, Rule} from '@roots/bud-build'

import BudSass from './sass.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-sass': BudSass
  }

  interface Loaders {
    sass: Loader
  }

  interface Items {
    sass: Item
  }

  interface Rules {
    sass: Rule
  }
}

export default BudSass
