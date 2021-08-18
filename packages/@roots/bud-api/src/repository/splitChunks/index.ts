/**
 * @module @roots/bud-api
 */

import type {Repository} from '..'

/**
 * @function splitChunks
 */
const splitChunks: Repository.SplitChunks = function (options) {
  this.hooks.on(
    'build/optimization/splitChunks',
    options ?? this.store.get('build.optimization.splitChunks'),
  )

  return this
}

/**
 * @exports splitChunks
 */
export {splitChunks}
