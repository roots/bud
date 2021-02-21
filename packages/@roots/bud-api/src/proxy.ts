import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## proxy  [💁 Fluent]
     *
     * Set proxy settings for the development server.
     *
     * ### Usage
     *
     * ```js
     * bud.proxy()
     * ```
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
      enabled?: boolean
      host?: Server.Options['proxy']['host']
      port?: Server.Options['proxy']['port']
    }) => Framework
  }
}

export const proxy: Framework.Api.Proxy = function (config) {
  this.options.set('proxy', config?.enabled ?? true)

  if (config) {
    const props = ['host', 'port']

    props.forEach(prop => {
      config[prop] &&
        this.store.set(`server.proxy.${prop}`, config[prop])
    })
  }

  return this
}
