import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'
import {Bud} from '@roots/bud'

export const reactRefresh: ReactRefresh = function (options) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .set('options', options)

  return this
}

export type ReactRefresh = (
  this: Bud,
  options: ReactRefreshPluginOptions,
) => Bud
