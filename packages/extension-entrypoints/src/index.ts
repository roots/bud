import {Extension} from './types'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

/**
 * Typings
 */
export * from './types'

/**
 * Extension name
 */
export const name = '@roots/bud-entrypoints'

/**
 * Extension cfg fns
 */
export * as api from './api'

/**
 * Webpack plugin
 */
export const make: Extension.Make = options =>
  new Entrypoints.Plugin(options.all())

/**
 * Webpack plugin options
 */
export const options: Entrypoints.Options = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}

export const when = app => app.options.enabled('entrypoints')
