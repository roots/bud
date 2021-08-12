/**
 * @module @roots/bud-api
 */

import type Repository from '../'

/**
 * @function config
 */
const config: Repository.Config = function (config) {
  this.store.mergeStore(config)

  return this
}

/**
 * @exports config
 */
export {config}
