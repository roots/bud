import {Configuration, Framework} from '@roots/bud-framework'

export interface proxy {
  (config?: Configuration['server']['proxy'] | false): Framework
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
  const ctx = this as Framework

  if (!ctx.server) return this
  if (typeof options === 'undefined') return this

  if (options === false)
    ctx.store.set('server.middleware.proxy', false)
  else ctx.store.merge('server.proxy', options)

  return this
}
