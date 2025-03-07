// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * Adds support for react to bud projects.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {Extension} from '@roots/bud-framework/extension'
import type BudBabelRefresh from '@roots/bud-react/babel-refresh'
import type BudReactRefresh from '@roots/bud-react/react-refresh'
import type BudSWCRefresh from '@roots/bud-react/swc-refresh'
import type BudTypeScriptRefresh from '@roots/bud-react/typescript-refresh'

import BudReact from '@roots/bud-react/extension'

interface PublicBudReact extends Extension {
  refresh: BudBabelRefresh
  useBabel: boolean
  useSWC: boolean
  useTypeScript: boolean
}

declare module '@roots/bud-framework' {
  interface Bud {
    react: PublicBudReact
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@roots/bud-react/babel-refresh': BudBabelRefresh
    '@roots/bud-react/react-refresh': BudReactRefresh
    '@roots/bud-react/swc-refresh': BudSWCRefresh
    '@roots/bud-react/typescript-refresh': BudTypeScriptRefresh
  }
}

export {default} from '@roots/bud-react/extension'
