import {Api, Server} from '@roots/bud-framework'
import {isUndefined, isBoolean} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## proxy
     *
     * Set proxy settings for the development server.
     *
     * By default it proxies whatever is running on localhost on port 8000.
     *
     * ### Usage
     *
     * Enable:
     *
     * ```js
     * bud.proxy()
     * ```
     *
     * Disable:
     *
     * ```js
     * bud.proxy({enabled: false})
     * ```
     *
     * Specify host and port:
     *
     * ```js
     * bud.proxy({
     *  host: 'example.test',
     *  port: 3000,
     * })
     * ```
     */
    proxy: Api.Proxy
  }

  namespace Api {
    type Proxy = (config?: {
      /**
       * Explicity enable or disable proxy service
       */
      enabled?: boolean

      /**
       * Hostname of the proxy target
       */
      host?: Server.Configuration['proxy']['host']

      /**
       * Port of the proxy target
       */
      port?: Server.Configuration['proxy']['port']
    }) => Framework
  }
}

const proxy: Api.Proxy = function (config) {
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
      this.dashboard.error(
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
