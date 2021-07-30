/**
 * @module @roots/bud-api
 */

import type {DefinePlugin} from 'webpack'

import type {Repository} from '../'

/**
 * @function define
 */
const define: Repository.Define = function (values) {
  this.hooks.on(
    'extension/webpack-define-plugin/options',
    (existant: DefinePlugin['definitions']) => ({
      ...existant,
      ...values,
    }),
  )

  return this
}

/**
 * @exports define
 */
export {define}
