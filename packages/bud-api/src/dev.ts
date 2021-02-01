declare module '@roots/bud-framework' {
  export interface Framework {
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

  export namespace Framework.Api {
    export type Dev = (
      this: Framework,
      values: Server.Options,
    ) => Framework
  }
}

import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'

export const dev: Framework.Api.Dev = function (config) {
  this.store.merge('server.config', config)

  return this
}
