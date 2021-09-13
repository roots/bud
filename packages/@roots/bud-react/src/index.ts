// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * Add React to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @extension @packageDocumentation @betaDocumentation
 */

import {BudReactExtension} from './BudReactExtension'
import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'
import {reactRefresh} from './reactRefresh'

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReactExtension
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefreshPlugin
  }
}

export const {name, boot} = BudReactExtension

export {BudReactExtension}
export {BudReactRefreshPlugin}
export {reactRefresh}
