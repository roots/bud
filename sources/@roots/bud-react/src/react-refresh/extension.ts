import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Bud, Extension} from '@roots/bud-framework'
import {Container} from '@roots/container'

/**
 * Add react-refresh-webpack-plugin
 *
 * @public
 */
export interface ReactRefreshExtension
  extends Extension.Plugin<RefreshPlugin, ReactRefreshPluginOptions> {
  label: '@pmmmwh/react-refresh-webpack-plugin'
  options: ReactRefreshPluginOptions
  make: (options: Container<ReactRefreshPluginOptions>) => RefreshPlugin
  when: (app: Bud) => boolean
}

export const ReactRefreshExtension: ReactRefreshExtension = {
  label: '@pmmmwh/react-refresh-webpack-plugin',

  options: {overlay: false},

  make: opt => new RefreshPlugin(opt.all()),

  when: ({isDevelopment}) => isDevelopment,
}
