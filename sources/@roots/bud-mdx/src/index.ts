// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * @roots/bud-mdx
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type Item from '@roots/bud-build/item'
import type Loader from '@roots/bud-build/loader'
import type Rule from '@roots/bud-build/rule'

import {default as BudMDX} from '@roots/bud-mdx/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    mdx: BudMDX
  }

  interface Loaders {
    mdx: Loader
  }

  interface Items {
    mdx: Item
  }

  interface Rules {
    mdx: Rule
  }

  namespace Registry {
    interface SyncRegistry {
      'pattern.mdx': RegExp
    }
  }

  interface Modules {
    '@roots/bud-mdx': Bud[`mdx`]
  }
}

export default BudMDX
