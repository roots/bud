import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import {Module} from '@roots/bud-extensions'

const extension: Module<
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

export default extension
export const {name, options, make, when, api} = extension
