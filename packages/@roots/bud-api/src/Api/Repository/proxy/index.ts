import {Framework, Server} from '@roots/bud-framework'

import {isBoolean, isUndefined} from '../../../services/lodash'

export interface proxy {
  (
    this: Framework,
    config?: {
      /**
       * Explicity enable or disable proxy service
       */
      enabled?: boolean

      /**
       * Hostname of the proxy target
       */
      host?: Server.Configuration['proxy']['target']['host']

      /**
       * Port of the proxy target
       */
      port?: Server.Configuration['proxy']['target']['port']
    },
  ): Framework
}

/**
 * Set proxy settings for the development server.
 *
 * @remarks
 *
 * - By default there is no proxy enabled.
 *
 * - If enabled with no  proxies whatever is running on localhost on port 8000.
 *
 * @example
 * Enable:
 *
 * ```js
 * bud.proxy()
 * ```
 *
 * @example
 * Disable:
 *
 * ```js
 * bud.proxy({enabled: false})
 * ```
 *
 * @example
 * Specify host and port:
 *
 * ```js
 * bud.proxy({
 *  host: 'example.test',
 *  port: 3000,
 * })
 * ```
 *
 * @public @config
 */
export const proxy: proxy = function (options = undefined) {
  if (!this.server) {
    return
  }

  /**
   * Case: no config passed
   * Response: enable proxy and bounce
   */
  if (isUndefined(options)) {
    this.server?.config?.set('middleware.proxy', true)

    return this
  }

  /**
   * Case: options.enabled isn't explicitly set
   * Response: enable proxy
   */
  if (isUndefined(options?.enabled)) {
    this.server?.config?.set('middleware.proxy', true)
  } else {
    /**
     * Case: options.enabled isn't boolean
     * Throw error
     */
    this.when(!isBoolean(options.enabled), () => {
      this.error(
        'Attempt to set proxy enabled to a non boolean value.',
      )

      process.exit()
    })

    /**
     * Case: options.enabled is explicitly set and boolean
     * Use supplied boolean
     */
    this.server?.config?.set('middleware.proxy', options.enabled)
  }

  this.server?.config?.merge('proxy.target', {
    ...options,
    enabled: undefined,
  })

  return this
}
