// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-wordpress-externals
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import BudWordPressExternals from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-externals': BudWordPressExternals
  }
}

export {BudWordPressExternals as default}
