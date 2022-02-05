import type {Extension, Framework} from '@roots/bud-framework'

import {reactRefresh} from './react-refresh/config'

/**
 * Adds React support
 *
 * @public
 */
export interface BudReactExtension extends Extension.Module {
  name: '@roots/bud-react'
  api: {reactRefresh: reactRefresh}
  boot: (app: Framework) => Promise<void>
}

export const BudReactExtension: BudReactExtension = {
  name: '@roots/bud-react',
  api: {reactRefresh},
  boot: async app => {
    app.babel.setPreset(
      '@babel/preset-react',
      require.resolve('@babel/preset-react'),
    )
  },
}
