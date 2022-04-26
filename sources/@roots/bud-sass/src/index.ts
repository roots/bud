/**
 * Add sass support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-postcss/types'

import type {Build} from '@roots/bud-framework/types'

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

import BudSass from './extension'
export default BudSass
