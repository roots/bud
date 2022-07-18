/**
 * Add sass support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Build} from '@roots/bud-framework'

import BudSass from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    sass: BudSass
  }
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

export default BudSass
