import type {Framework} from '@roots/bud-framework'
import type {Server} from '@roots/bud-framework'

/**
 * {@link dev | dev} config function interface
 *
 * @param this - {@link @roots/bud-framework#Framework | Framework instance}
 * @param config - {@link @roots/bud-framework#Server.Configuration | Server configuration}
 *
 * @public @config
 */
interface dev {
  (this: Framework, config?: Server.Configuration): Framework
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
const dev: dev = function (config) {
  const target = this.parent ?? this

  target.server.config.mutateStore(
    (store: Server.Configuration) => ({
      ...store,
      ...config,
    }),
  )

  return this
}

export {dev as default}
