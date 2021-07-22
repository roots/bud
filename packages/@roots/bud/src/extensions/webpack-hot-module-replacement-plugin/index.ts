import {Module} from '@roots/bud-framework'
import {HotModuleReplacementPlugin} from 'webpack'

export const name = 'webpack-hot-module-replacement-plugin'

export const make: Module.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Module.When = app =>
  app.isDevelopment &&
  !app.parent &&
  app.server?.config?.isTrue('middleware.hot')
