// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds support for react to bud projects.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 *
 * @packageDocumentation
 */

import '@roots/bud-babel/types'

import BudReactRefresh from './react-refresh/extension'
import {reactRefresh} from './react-refresh/reactRefresh'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefresh
  }
}

import BudReact from './extension'
export default BudReact
