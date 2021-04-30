import Plugin from '@pmmmwh/react-refresh-webpack-plugin'
import {Framework, Module} from '@roots/bud-framework'
import {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

declare interface ReactRefreshExtension
  extends Module<Plugin, Options> {
  api: {
    reactRefresh: Framework['reactRefresh']
  }
}

const extension: ReactRefreshExtension = {
  name: '@pmmmwh/react-refresh-webpack-plugin',
  options: {overlay: false},
  make: opt => new Plugin(opt.all()),
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
