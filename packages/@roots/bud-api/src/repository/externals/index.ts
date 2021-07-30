/**
 * @module @roots/bud-api
 */

import type Webpack from 'webpack'

import type {Repository} from '../'

/**
 * @function externals
 */
const externals: Repository.Externals = function (externals) {
  this.hooks.on(
    'build/externals',
    (existant: Webpack.Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Webpack.Configuration['externals']),
  )

  return this
}

/**
 * @exports externals
 */
export {externals}
