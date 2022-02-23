import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type * as Bud from '@roots/bud-framework'
import {Container} from '@roots/container'

/**
 * Add react-refresh-webpack-plugin
 *
 * @public
 */
export interface ReactRefreshExtension
  extends Bud.Extension.CompilerPlugin<
    RefreshPlugin,
    ReactRefreshPluginOptions
  > {
  name: '@pmmmwh/react-refresh-webpack-plugin'
  options: ReactRefreshPluginOptions
  make: (options: Container<ReactRefreshPluginOptions>) => RefreshPlugin
  when: (app: Bud.Framework) => boolean
}

export const ReactRefreshExtension: ReactRefreshExtension = {
  name: '@pmmmwh/react-refresh-webpack-plugin',
  options: {overlay: false},
  make: options => new RefreshPlugin(options.all()),
  when: app => app.isDevelopment,
}
