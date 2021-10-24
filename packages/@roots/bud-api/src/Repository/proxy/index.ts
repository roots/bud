import {Configuration, Framework} from '@roots/bud-framework'

export interface proxy {
  (
    this: Framework,
    config?: Configuration['server']['proxy'] | false,
  ): Framework
}

/**
 * Set proxy settings for the development server.
 *
 * @remarks
 *
 * - By default there is no proxy enabled.
 *
 * - If enabled with no  proxies whatever is running on localhost on port 8000.
 *
 * @example
 * Enable:
 *
 * ```js
 * bud.proxy()
 * ```
 *
 * @example
 * Disable:
 *
 * ```js
 * bud.proxy({enabled: false})
 * ```
 *
 * @example
 * Specify host and port:
 *
 * ```js
 * bud.proxy({
 *  host: 'example.test',
 *  port: 3000,
 * })
 * ```
 *
 * @public @config
 */
export const proxy: proxy = function (options = undefined) {
  const target = this.parent ?? this

  if (!target.server) return this
  if (typeof options === 'undefined') return this

  if (options === false)
    target.server.config.set('middleware.proxy', false)
  else target.server.config.merge('proxy', options)

  return this
}
