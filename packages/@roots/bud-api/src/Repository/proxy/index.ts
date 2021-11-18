import {Configuration, Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isUndefined} = lodash

export interface proxy {
  (options?: Configuration['server']['proxy']): Framework
}

export interface proxy {
  (options?: boolean): Framework
}

export interface proxy {
  (
    options?: Configuration['server']['proxy']['target'],
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
export const proxy: proxy = function (options) {
  this as Framework

  if (options === false) {
    this.store.set('server.middleware.proxy', false)
    return this
  }

  this.store.set('server.middleware.proxy', true)
  if (options === true || isUndefined(options)) {
    return this
  }

  if (typeof options === 'string') {
    this.store.set('server.proxy.target', options)
    return this
  }

  this.store.merge('server.proxy', options)

  return this
}
