import {
  PluginItem,
  PluginTarget,
  PluginOptions,
} from '@babel/core'

const transformRuntimeTarget: PluginTarget = require.resolve(
  '@babel/plugin-transform-runtime',
)

const transformRuntimeOptions: PluginOptions = {
  helpers: false,
}

export const transformRuntimeItem: PluginItem = [
  transformRuntimeTarget,
  transformRuntimeOptions,
]
