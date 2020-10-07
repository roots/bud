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
export const ident: Build.Use.Property = 'babel-loader'

export const query: Build.Use.Property = undefined

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('babel-loader')
}

export const options: Build.Use.Property = {
  presets: [env],
  plugins: [
    dynamicImport,
    objectRestSpread,
    transformRuntimeItem,
  ],
}
