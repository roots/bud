/**
 * Adds Sass to `@roots/bud`
 *
 * @packageDocumentation
 */

import type {Item, Loader, Rule} from '@roots/bud-build'

import {BudSassExtension} from './BudSassExtension'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-sass': BudSassExtension
    }
  }

  namespace Framework {
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
}

export const {name, boot} = BudSassExtension
