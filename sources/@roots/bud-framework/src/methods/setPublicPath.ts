import {lodash} from '@roots/bud-support'

import type {Bud} from '..'

const {isFunction, isString} = lodash

/**
 * @public
 */
export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Bud
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
 * @public
 */
export const setPublicPath: setPublicPath = function (publicPath) {
  this as Bud

  isString(publicPath) &&
    this.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    this.hooks.on('build.output.publicPath', publicPath)

  return this
}
