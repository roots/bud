import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Module} from '@roots/bud-framework'

import {reactRefresh} from './reactRefresh'

/**
 * Adds react-refresh-webpack-plugin to @roots/bud projects
 */
interface BudReactRefreshPlugin
  extends Module<RefreshPlugin, ReactRefreshPluginOptions> {}

const BudReactRefreshPlugin: BudReactRefreshPlugin = {
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

export {BudReactRefreshPlugin}
