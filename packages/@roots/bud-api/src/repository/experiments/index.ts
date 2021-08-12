/**
 * @module @roots/bud-api
 */

import type Repository from '../'

/**
 * @function experiments
 */
const experiments: Repository.Experiments = function (settings) {
  this.hooks.on('build/experiments', settings)

  return this
}

/**
 * @exports experiments
 */
export {experiments}
