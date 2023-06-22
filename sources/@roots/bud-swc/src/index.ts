// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-swc
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {Item, Loader, Rule} from '@roots/bud-framework'

import {BudSWC, type BudSWCPublicInterface} from './extension/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    swc: BudSWCPublicInterface
  }

  interface Modules {
    '@roots/bud-swc': BudSWC
  }

  interface Loaders {
    swc: Loader
  }

  interface Items {
    'swc-ecmascript': Item
    'swc-typescript': Item
  }

  interface Rules {
    js: Rule
    ts: Rule
  }
}

export {BudSWC as default}
export type * from './extension/index.js'
