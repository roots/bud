/**
 * @module @roots/bud-api
 */

import type {Repository} from '..'

/**
 * @function devtool
 */
const devtool: Repository.Devtool = function (devtool = false) {
  this.hooks.on('build/devtool', () => devtool)

  return this
}

/**
 * @exports devtool
 */
export {devtool}
