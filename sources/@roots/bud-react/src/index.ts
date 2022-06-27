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

import type BudBabelRefresh from './babel-refresh'
import BudReact from './extension.js'
import type BudReactRefresh from './react-refresh/extension.js'
import type BudTypeScriptRefresh from './typescript-refresh/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    react: BudReact
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@roots/bud-react/babel-refresh': BudBabelRefresh
    '@roots/bud-react/react-refresh': BudReactRefresh
    '@roots/bud-react/typescript-refresh': BudTypeScriptRefresh
  }
}

export default BudReact
