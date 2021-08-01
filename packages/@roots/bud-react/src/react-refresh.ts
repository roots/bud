/**
 * @module @roots/bud-react
 */

import * as RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import {Module} from '@roots/bud-extensions'

/**
 * @const {Module} reactRefreshExtension
 */
const reactRefreshExtension: Module<
  RefreshPlugin,
  ReactRefreshPluginOptions
> = {
  name: '@pmmmwh/react-refresh-webpack-plugin',
  options: () => ({overlay: false}),
  make: opt => new RefreshPlugin(opt.all()),
  when: ({isDevelopment}) => isDevelopment,
  api: {
    reactRefresh: function (options: ReactRefreshPluginOptions) {
      this.hooks.on(
        'extension/@pmmmwh/react-refresh-webpack-plugin/options',
        () => options,
      )

      return this
    },
  },
}

/**
 * @exports default
 * @exports reactRefreshExtension
 */
export {reactRefreshExtension, reactRefreshExtension as default}

/**
 * @exports name
 * @exports options
 * @exports make
 * @exports when
 * @exports api
 */
export const {name, options, make, when, api} =
  reactRefreshExtension
