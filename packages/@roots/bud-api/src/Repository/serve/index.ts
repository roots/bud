import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (config?: Partial<Server.Configuration>): Framework
}

/**
 * Configure development server.
 *
 * @example
 * ```js
 * app.serve({
 *   host: 'my-local-site.example',
 *   port: 5000,
 * })
 * ```
 *
 * @public @config
 */
export const serve: serve = function (config) {
  this as Framework

  config.host && this.store.set('server.host', config.host)
  config.port && this.store.set('server.port', config.port)

  config.middleware &&
    this.store.merge('server.middleware', config.middleware)

  return this
}
