import type {Config} from './Config'

/**
 * Default babel plugins
 *
 * @public
 */
export const DEFAULT_PLUGINS: Array<Config.Registrable> = [
  ['@babel/plugin-transform-runtime', {helpers: false}],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
]

/**
 * Default babel presets
 *
 * @public
 */
export const DEFAULT_PRESETS: Array<Config.Registrable> = [
  '@babel/preset-env',
]
