/**
 * @module @roots/bud-api
 */

import type {Server} from '@roots/bud-framework'

import type Repository from '../'

/**
 * @function dev
 */
const dev: Repository.Dev = function (config) {
  const target = this.parent ?? this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}

/**
 * @exports dev
 */
export {dev}
