import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Framework} from '@roots/bud-framework'

/**
 * Configure react-refresh-webpack-plugin options
 */
interface reactRefresh {
  (this: Framework, options: ReactRefreshPluginOptions): Framework
}

const reactRefresh: reactRefresh = function (userOptions) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .mergeOptions(userOptions)

  return this
}

export {reactRefresh}
