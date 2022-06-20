// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds TypeScript support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @remarks
 * You should absolutely use this extension
 *
 * @packageDocumentation
 */

import type {Item, Loader, Rule} from '@roots/bud-framework/services/build'

import BudTypeScript from './extension.js'
import type BudTypeCheckPlugin from './typecheck/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    typescript: BudTypeScript
  }

  interface Modules {
    '@roots/bud-typescript': BudTypeScript
    '@roots/bud-typescript/typecheck': BudTypeCheckPlugin
  }

  interface Loaders {
    ts: Loader
  }

  interface Items {
    ts: Item
  }

  interface Rules {
    ts: Rule
  }
}

export default BudTypeScript
