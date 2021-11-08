import type {Framework} from '@roots/bud-framework'

import {isFunction, isString} from '../../services/lodash'

/**
 * @public @config
 */
interface setPublicPath {
  (
    publicPath: string | ((publicPath: string) => string),
  ): Framework
}

/**
 * By default it is assumed that assets are served from webroot (`/`).
 * You can use this method to replace this value for apps served from
 * a subdirectory.
 *
 * @example
 * Set the default path using a string
 *
 * ```js
 * app.setPublicPath('/app/themes/sage/dist')
 * ```
 *
 * @example
 * Set the publicPath using a function.
 *
 * ```js
 * app.setPublicPath(publicPath => {
 *   return `web/assets/${publicPath}`
 * })
 * ```
 *
 * @public @config
 */
const setPublicPath: setPublicPath = function (publicPath) {
  isString(publicPath) &&
    this.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build.output.publicPath', publicPath)

  return this
}

export {setPublicPath as default}
