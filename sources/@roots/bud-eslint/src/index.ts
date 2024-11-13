// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * Provides eslint integration for Bud.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import * as Extension from '@roots/bud-eslint/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: Extension.Api & Extension.BudEslint
  }

  interface Modules {
    '@roots/bud-eslint': Extension.BudEslint
  }
}

export {BudEslint as default} from '@roots/bud-eslint/extension'
