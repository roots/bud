// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds support for preact to bud projects.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import BudPreact from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    react: BudPreact
  }

  interface Modules {
    '@roots/bud-preact': BudPreact
  }
}

export default BudPreact
