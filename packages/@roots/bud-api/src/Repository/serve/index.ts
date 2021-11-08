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
  const ctx = this as Framework

  if (!ctx.root.server) return this

  ctx.root.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}
