import type {Framework, Server} from '@roots/bud-framework'

export interface serve {
  (
    this: Framework,
    config?: Partial<Server.Configuration>,
  ): Framework
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
  const target = this.parent ?? this
  if (!target.server) return this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}
