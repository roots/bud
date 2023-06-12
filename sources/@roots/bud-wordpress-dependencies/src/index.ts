// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/wordpress-dependencies-webpack-plugin` adapter
 *
 * @see https://bud.js.org
 */

import BudWordPressDependencies from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-wordpress-dependencies': BudWordPressDependencies
  }
}

export default BudWordPressDependencies
