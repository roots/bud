import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'
import {isUndefined} from 'lodash'

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
   * Allow --server.middleware.proxy to override
   */
  const implicitEnable =
    isUndefined(config) &&
    !this.store.has('args.server.middleware.proxy')

  if (implicitEnable) {
    /**
     * In the case of no config enable the default
     * proxy and return the builder.
     */
    this.server.config.set('middleware.proxy', true)

    /**
     * @exit
     */
    return this
  }

  if (!isUndefined(config.enabled)) {
    /**
     * Allow --server.middleware.proxy to override
     */
    !this.store.has('args.server.middleware.proxy') &&
      this.server.config.set('middleware.proxy', config.enabled)

    delete config.enabled
  } else {
    /**
     * Allow --server.middleware.proxy to override
     */
    !this.store.has('args.server.middleware.proxy') &&
      this.server.config.set('middleware.proxy', true)
  }

  /**
   * Allow --server.proxy to override
   */
  !this.store.has('args.server.proxy') &&
    this.server.config.merge(`proxy`, config)

  return this
}
