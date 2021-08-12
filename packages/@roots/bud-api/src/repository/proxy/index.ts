import {isBoolean, isUndefined} from 'lodash'

import type Repository from '..'

const proxy: Repository.Proxy = function (config) {
  /**
   * Case: no config passed
   * Response: enable proxy and bounce
   */
  if (isUndefined(config)) {
    this.server.config.set('middleware.proxy', true)

    return this
  }

  /**
   * Case: config.enabled isn't explicitly set
   * Response: enable proxy
   */
  if (isUndefined(config.enabled)) {
    this.server.config.set('middleware.proxy', true)
  } else {
    /**
     * Case: config.enabled isn't boolean
     * Throw error
     */
    this.when(!isBoolean(config.enabled), () => {
      this.error(
        'Attempt to set proxy enabled to a non boolean value.',
      )

      process.exit()
    })

    /**
     * Case: config.enabled is explicitly set and boolean
     * Use supplied boolean
     */
    this.server.config.set('middleware.proxy', config.enabled)
  }

  this.server.config.merge('proxy', {
    ...config,
    enabled: undefined,
  })

  return this
}

export {proxy}
