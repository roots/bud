import type {Registrable} from './babel.interface'

/**
 * Default babel plugins
 *
 * @public
 */
export const DEFAULT_PLUGINS: Record<string, Registrable> = {
  '@babel/plugin-transform-runtime': [
    require.resolve('@babel/plugin-transform-runtime'),
    {helpers: false},
  ],
  '@babel/plugin-proposal-object-rest-spread': require.resolve(
    '@babel/plugin-proposal-object-rest-spread',
  ),
  '@babel/plugin-syntax-dynamic-import': require.resolve(
    '@babel/plugin-syntax-dynamic-import',
  ),
  '@babel/plugin-proposal-class-properties': require.resolve(
    '@babel/plugin-proposal-class-properties',
  ),
}

/**
 * Default babel presets
 *
 * @public
 */
export const DEFAULT_PRESETS: Record<string, Registrable> = {
  '@babel/preset-env': require.resolve('@babel/preset-env'),
}
