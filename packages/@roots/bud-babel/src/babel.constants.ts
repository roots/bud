import type {Registrable} from './babel.interface'

/**
 * Default babel plugins
 *
 * @public
 */
export const DEFAULT_PLUGINS: Array<Registrable> = [
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
export const DEFAULT_PRESETS: Array<Registrable> = [
  '@babel/preset-env',
]
