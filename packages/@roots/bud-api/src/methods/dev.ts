import {Framework, Server} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## dev  [💁 Fluent]
     *
     * Configure development server.
     *
     * ### Usage
     *
     * ```js
     * app.dev({
     *   host: 'my-local-site.example',
     *   port: 5000,
     * })
     * ```
     */
    dev: Api.Dev
  }

  namespace Api {
    export {Dev}
  }
}

type Dev = (config?: Server.Configuration) => Framework

export const dev: Dev = function (config) {
  this.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}
