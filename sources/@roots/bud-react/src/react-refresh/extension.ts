import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Extension} from '@roots/bud-framework'

/**
 * Add react-refresh-webpack-plugin
 *
 * @public
 */
export interface BudReactRefreshExtension
  extends Extension.CompilerPlugin<
    RefreshPlugin,
    ReactRefreshPluginOptions
  > {}

export const BudReactRefreshExtension: BudReactRefreshExtension = {
  name: '@pmmmwh/react-refresh-webpack-plugin',

  options: {overlay: false},

  make: opt => new RefreshPlugin(opt.all()),

  when: ({isDevelopment}) => isDevelopment,
}
