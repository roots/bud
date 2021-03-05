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
      host?: Server.Options['proxy']['host']

      /**
       * Port of the proxy target
       */
      port?: Server.Options['proxy']['port']
    }) => Framework
  }
}

export const proxy: Framework.Api.Proxy = function (config) {
  /**
   * In the case of no config enable the default
   * proxy and return the builder.
   */
  if (isUndefined(config)) {
    this.store.set('server.middleware.proxy', true)

    return this
  }

  if (!isUndefined(config.enabled)) {
    this.store.set('server.middleware.proxy', config.enabled)

    delete config.enabled
  } else {
    this.store.set('server.middleware.proxy', true)
  }

  this.store.merge(`server.proxy`, config)

  return this
}
