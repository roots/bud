import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {Module} from '@roots/bud-extensions'
import {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

type ReactRefreshExtension = Module<RefreshPlugin, Options>

const extension: ReactRefreshExtension = {
  name: '@pmmmwh/react-refresh-webpack-plugin',
  options: () => ({overlay: false}),
  make: opt => new RefreshPlugin(opt.all()),
  when: ({isDevelopment}) => isDevelopment,
  api: {
    reactRefresh: function (options) {
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
