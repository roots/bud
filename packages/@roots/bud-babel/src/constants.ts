/**
 * @module Framework.Extensions.Babel
 */

import type {BabelConfig} from './'

/**
 * Default babel plugins
 */
const DEFAULT_PLUGINS: Array<BabelConfig.Registrable> = [
  ['@babel/plugin-transform-runtime', {helpers: false}],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
]

/*
 * Default babel presets
 */
const DEFAULT_PRESETS: Array<BabelConfig.Registrable> = [
  '@babel/preset-env',
]

export {DEFAULT_PLUGINS, DEFAULT_PRESETS}
