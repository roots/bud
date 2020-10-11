import {PluginItem, PluginTarget} from '@babel/core'

const target: PluginTarget = require.resolve(
  '@babel/plugin-proposal-object-rest-spread',
)

export const objectRestSpread: PluginItem = [target]
