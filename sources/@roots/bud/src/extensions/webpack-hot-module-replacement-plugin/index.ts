import {Extension} from '@roots/bud-framework'
import {HotModuleReplacementPlugin} from 'webpack'

export const label = 'webpack:hot-module-replacement-plugin'

export const plugin: Extension['plugin'] = HotModuleReplacementPlugin

export const when: Extension['when'] = async (options, app) =>
  app.isDevelopment
