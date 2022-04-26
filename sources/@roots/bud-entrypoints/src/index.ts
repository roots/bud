// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Entrypoints manifest webpack plugin
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-entrypoints': BudEntrypoints
  }
}

import BudEntrypoints from './extension'
export default BudEntrypoints
