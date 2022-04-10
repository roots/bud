import type {Bud, Extensions} from '@roots/bud-framework'

import {reactRefresh} from './react-refresh/reactRefresh'

/**
 * Adds React support
 *
 * @public
 */
export interface ReactExtension extends Extensions.Module {
  label: '@roots/bud-react'
  api: {reactRefresh: reactRefresh}
  boot: (app: Bud) => Promise<void>
}

export const ReactExtension: ReactExtension = {
  label: '@roots/bud-react',
  api: {reactRefresh},
  boot: async app => {
    app.babel.setPreset(
      '@babel/preset-react',
      require.resolve('@babel/preset-react'),
    )
  },
}
