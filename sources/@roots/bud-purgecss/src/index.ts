// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-purgecss
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {purgecss} from './api.js'

import BudPurgeCSS from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: typeof purgecss
  }

  interface Modules {
    '@roots/bud-purgecss': BudPurgeCSS
  }
}

export {BudPurgeCSS as default}
