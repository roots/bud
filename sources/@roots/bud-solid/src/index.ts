// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add solid.js to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-babel/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-solid': BudSolid
  }
}

import BudSolid from './extension'
export default BudSolid
