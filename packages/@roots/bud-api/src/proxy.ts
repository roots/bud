import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'
import {isBoolean, isUndefined} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## proxy  [💁 Fluent]
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
     * bud.proxy(false)
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
    proxy: Framework.Api.Proxy
  }

  namespace Framework.Api {
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

export const proxy: Framework.Api.Proxy = function (config) {
  /**
   * Case: no config passed
   * Response: enable proxy and bounce
   */
  if (isUndefined(config)) {
    /**
     * Allow --server.middleware.proxy to override
     */
    !this.store.has('args.server.middleware.proxy') &&
      /**
       * Enable proxy
       */
      this.server.config.set('middleware.proxy', true)

    /** @exit */
    return this
  }

  /**
   * Case: config.enabled is explicitly set
   * Response: enable proxy, delete property from config
   */
  if (!isUndefined(config.enabled)) {
    if (!isBoolean(config.enabled)) {
      this.dashboard.error(
        'Attempt to set proxy enabled to a non boolean value.',
      )
      process.exit()
    }

    /**
     * Allow --server.middleware.proxy to override
     */
    !this.store.has('args.server.middleware.proxy') &&
      this.server.config.set('middleware.proxy', config.enabled)

    delete config.enabled
    /**
     * Case: config.enable is not explicitly set but other config items were
     * Response: enable proxy
     */
  } else {
    /**
     * Allow --server.middleware.proxy to override
     */
    !this.store.has('args.server.middleware.proxy') &&
      this.server.config.set('middleware.proxy', true)
  }

  /**
   * Fallthrough
   * Allow --server.proxy to override
   */
  !this.store.has('args.server.proxy') &&
    this.server.config.merge(`proxy`, config)

  return this
}
