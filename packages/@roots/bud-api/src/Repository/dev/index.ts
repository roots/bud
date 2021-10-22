import type {Framework, Server} from '@roots/bud-framework'

export interface dev {
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
 * app.dev({
 *   host: 'my-local-site.example',
 *   port: 5000,
 * })
 * ```
 *
 * @public @config
 */
export const dev: dev = function (config) {
  const target = this.parent ?? this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}
