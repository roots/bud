import type {Framework} from '@roots/bud-framework'

import {isFunction, isString} from '../../services/lodash'

export interface setPublicPath {
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
export const setPublicPath: setPublicPath = function (
  publicPath,
) {
  const ctx = this as Framework

  isString(publicPath) &&
    ctx.hooks.on('build.output.publicPath', () => publicPath)

  isFunction(publicPath) &&
    ctx.hooks.on('build.output.publicPath', publicPath)

  return ctx
}
