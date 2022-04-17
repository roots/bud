import type {Extensions} from '@roots/bud-framework'

import {reactRefresh} from './react-refresh/reactRefresh'

/**
 * Adds React support
 *
 * @public
 */
export type ReactExtension = Extensions.Module

export const ReactExtension: ReactExtension = {
  label: '@roots/bud-react',

  register: async ({api}) => api.bindFacade('reactRefresh', reactRefresh),

  boot: async app => {
    app.babel.setPreset(
      '@babel/preset-react',
      require.resolve('@babel/preset-react'),
    )
  },
}
