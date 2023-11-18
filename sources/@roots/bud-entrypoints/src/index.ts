// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Bud entrypoints extension
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import BudEntrypoints from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    entrypoints: PublicExtensionApi<BudEntrypoints>
  }
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}

export default BudEntrypoints
