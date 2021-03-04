import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'
import {isBoolean} from 'lodash'

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
    type Proxy = (
      config?:
        | {
            enabled?: boolean
            host?: Server.Options['proxy']['host']
            port?: Server.Options['proxy']['port']
          }
        | boolean,
    ) => Framework
  }
}

export const proxy: Framework.Api.Proxy = function (config) {
  if (!config) {
    this.store.set('server.middleware.proxy', true)
  }

  this.store.set(
    'server.middleware.proxy',
    isBoolean(config)
      ? config
      : isBoolean(config.enabled)
      ? config.enabled
      : true,
  )

  const props = ['host', 'port']

  props.forEach(prop => {
    config[prop] &&
      this.store.set(`server.proxy.${prop}`, config[prop])
  })

  return this
}
