import {Framework, Server} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## dev
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
    export type Dev = (
      this: Framework,
      config?: Server.Configuration,
    ) => Framework
  }
}

const dev: Framework.Api.Dev = function (config) {
  const target = this.isChild ? this.parent : this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}

export {dev}
