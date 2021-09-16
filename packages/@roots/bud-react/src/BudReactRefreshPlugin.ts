import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Extension} from '@roots/bud-framework'

import {reactRefresh} from './reactRefresh'

/**
 * Adds react-refresh-webpack-plugin
 *
 * @public
 */
export interface BudReactRefreshPlugin
  extends Extension.CompilerPlugin<
    RefreshPlugin,
    ReactRefreshPluginOptions
  > {}

/**
 * Adds react-refresh-webpack-plugin
 *
 * @public
 */
export const BudReactRefreshPlugin: BudReactRefreshPlugin = {
  name: '@pmmmwh/react-refresh-webpack-plugin',

  options: {
    overlay: false,
  },

  make: opt => new RefreshPlugin(opt.all()),

  when: ({isDevelopment}) => isDevelopment,

  api: {
    reactRefresh,
  },
}
