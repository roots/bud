/**
 * @module @roots/bud-api
 */

import type {Repository} from '../'

/**
 * @function watch
 */
const watch: Repository.Watch = function (files, options) {
  const target = this.isChild ? this.parent : this

  if (!target.isDevelopment || !target.server) {
    target.log('Skipping watched files in production')
    return this
  }

  files && this.server.config.set('watch.files', files)
  options && this.server.config.set('watch.options', options)

  return this
}

/**
 * @exports watch
 */
export {watch}
