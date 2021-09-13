import {Extension} from '@roots/bud-framework'
import {HotModuleReplacementPlugin} from 'webpack'

export const name = 'webpack-hot-module-replacement-plugin'

export const make: Extension.CompilerPlugin['make'] = () =>
  new HotModuleReplacementPlugin()

export const when: Extension.CompilerPlugin['when'] = app =>
  app.isDevelopment &&
  !app.parent &&
  app.server?.config?.isTrue('middleware.hot')
