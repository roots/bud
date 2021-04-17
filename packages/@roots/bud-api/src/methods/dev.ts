import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'

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
    dev: Framework.Api.Dev
  }

  namespace Framework.Api {
    export {Dev}
  }
}

type Dev = (config?: Server.Configuration) => Framework

export const dev: Dev = function (config) {
  this.server.config.mutateStore(store => ({
    ...store,
    ...config,
  }))

  return this
}
