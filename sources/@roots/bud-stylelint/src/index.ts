// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add stylelint support to Bud
 *
 * @see https://bud.js.org/extensions/bud-stylelint
 * @see https://github.com/roots/bud/tree/main/sources/@roots/bud-styelint
 */

import type {BudStylelintPublicApi} from './extension/base.js'
import BudStylelint from './extension/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: BudStylelintPublicApi
  }

  interface Modules {
    '@roots/bud-stylelint': BudStylelint
  }
}

export {BudStylelint as default}
