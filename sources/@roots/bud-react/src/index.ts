// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds support for react to bud projects.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import BudReact from './extension.js'
import type BudReactRefresh from './react-refresh/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    react: BudReact
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@roots/bud-react/react-refresh': BudReactRefresh
  }
}

export default BudReact
