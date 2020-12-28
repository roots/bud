import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'
import type {Framework} from '@roots/bud-typings'

export const reactRefresh: ReactRefresh = function (options) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .setStore(options)

  return this
}

export type ReactRefresh = (
  this: Framework,
  options: ReactRefreshPluginOptions,
) => Framework
