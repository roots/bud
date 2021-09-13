/**
 * Add sass support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type {Item, Loader, Rule} from '@roots/bud-build'

import {BudSassExtension} from './BudSassExtension'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-sass': BudSassExtension
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

export const {name, boot} = BudSassExtension
