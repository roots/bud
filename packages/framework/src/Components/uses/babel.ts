import Use from '../Use'
import {
  PluginItem,
  PluginTarget,
  PluginOptions,
} from '@babel/core'

/**
 * Preset env
 */
const envTarget: PluginTarget = require.resolve(
  '@babel/preset-env',
)
const envOptions: PluginOptions = {
  modules: false,
  forceAllTransforms: true,
}
const env: PluginItem = [envTarget, envOptions]

/**
 * Transform runtime.
 */
const transformRuntimeTarget: PluginTarget = require.resolve(
  '@babel/plugin-transform-runtime',
)
const transformRuntimeOptions: PluginOptions = {
  helpers: false,
}
const transformRuntimeItem: PluginItem = [
  transformRuntimeTarget,
  transformRuntimeOptions,
]

/**
 * Object rest spread
 */
const objectRestSpreadTarget: PluginTarget = require.resolve(
  '@babel/plugin-proposal-object-rest-spread',
)
const objectRestSpread: PluginItem = [objectRestSpreadTarget]

/**
 * Dynamic import
 */
const dynamicImportTarget: PluginTarget = require.resolve(
  '@babel/plugin-syntax-dynamic-import',
)
const dynamicImport: PluginItem = [dynamicImportTarget]

/**
 * Babel loader
 */
export const ident: Use.Property = 'babel-loader'
export const query: Use.Property = undefined
export const loader: Use.Factory = function () {
  return this.store['loaders'].get('babel-loader')
}

export const options: Use.Property = {
  presets: [env],
  plugins: [
    dynamicImport,
    objectRestSpread,
    transformRuntimeItem,
  ],
}
