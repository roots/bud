// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * solidjs configuration extension
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import BudSolid from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-solid': BudSolid
  }
}

export {BudSolid as default}
