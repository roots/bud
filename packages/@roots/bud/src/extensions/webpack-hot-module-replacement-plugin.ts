import {HotModuleReplacementPlugin} from 'webpack'
import type {Module} from '@roots/bud-framework'

export const name = 'webpack-hot-module-replacement-plugin'

export const make: Module.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Module.When = app =>
  app.isDevelopment && app.server.config.isTrue('middleware.hot')
