import {
  PluginItem,
  PluginTarget,
  PluginOptions,
} from '@babel/core'

const target = require.resolve('@babel/preset-env')

const options: PluginOptions = {
  modules: false,
  forceAllTransforms: true,
}

export const env: PluginItem | [PluginTarget, PluginOptions] = [
  target,
  options,
]
