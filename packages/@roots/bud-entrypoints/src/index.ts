import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

/**
 * Extension name
 */
export const name = '@roots/bud-entrypoints'

/**
 * Webpack plugin
 */
export const make = options =>
  new Entrypoints.Plugin(options.all())

/**
 * Webpack plugin options
 */
export const options: Entrypoints.Options = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}
