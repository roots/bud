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

type Dev = (this: Framework, config: Server.Options) => Framework

export const dev: Dev = function (config) {
  this.store.merge('server.config', config)

  return this
}
