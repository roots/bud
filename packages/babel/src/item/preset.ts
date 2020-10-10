import {
  PluginItem,
  PluginTarget,
  PluginOptions,
} from '@babel/core'

const envTarget: PluginTarget = require.resolve(
  '@babel/preset-env',
)

const envOptions: PluginOptions = {
  modules: false,
  forceAllTransforms: true,
}

export const env: PluginItem = [envTarget, envOptions]
