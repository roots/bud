import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Framework} from '@roots/bud-framework'

/**
 * Configure react-refresh-webpack-plugin options
 */
interface reactRefresh {
  (
    this: Framework,
    options: ReactRefreshPluginOptions,
  ): Framework
}

const reactRefresh: reactRefresh = function (userOptions) {
  this.hooks.on(
    'extension/@pmmmwh/react-refresh-webpack-plugin/options',
    (
      options: ReactRefreshPluginOptions,
    ): ReactRefreshPluginOptions => ({
      ...options,
      ...userOptions,
    }),
  )

  return this
}

export {reactRefresh}
