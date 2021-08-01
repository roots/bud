/**
 * @module @roots/bud-api
 */

import type {Configuration} from 'webpack'

import type {Repository} from '../'

/**
 * @function externals
 */
const externals: Repository.Externals = function (externals) {
  this.hooks.on(
    'build/externals',
    (existant: Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Configuration['externals']),
  )

  return this
}

/**
 * @exports repository.externals
 */
export {externals}
