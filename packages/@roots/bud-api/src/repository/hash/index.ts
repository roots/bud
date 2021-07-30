/**
 * @module @roots/bud-api
 */

import type {Repository} from '..'

/**
 * @function hash
 */
const hash: Repository.Hash = function (enabled = true) {
  this.store.set('hash', enabled)
  return this
}

/**
 * @exports hash
 */
export {hash}
