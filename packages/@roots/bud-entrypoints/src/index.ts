import * as Entrypoints from '@roots/entrypoints-webpack-plugin'
import {Module} from '@roots/bud-typings'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-entrypoints'

/**
 * Webpack plugin
 */
export const make: Module['make'] = options =>
  new Entrypoints.Plugin(options.all())

/**
 * Webpack plugin options
 */
export const options: Module['options'] = (
  options: Entrypoints.Options,
) => ({
  name: 'entrypoints.json',
  writeToFileEmit: true,
})
