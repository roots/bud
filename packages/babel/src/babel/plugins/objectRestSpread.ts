import {PluginItem, PluginTarget} from '@babel/core'

const objectRestSpreadTarget: PluginTarget = require.resolve(
  '@babel/plugin-proposal-object-rest-spread',
)

export const objectRestSpread: PluginItem = [
  objectRestSpreadTarget,
]
