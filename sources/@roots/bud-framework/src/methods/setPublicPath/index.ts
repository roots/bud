import type {Bud} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

export interface setPublicPath {
  (
    publicPath?:
      | ((publicPath: string | undefined) => string | undefined)
      | string
      | undefined,
  ): Bud
}

/**
 * Set the application public path (e.g. `/assets`)
 *
 * @remarks
 * The default public path is `` (equivalent ot `auto`).
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
 * @see {@link https://bud.js.org/docs/bud.setPublicPath}
 */
export const setPublicPath: setPublicPath = function (publicPath) {
  const value = normalizePath(publicPath)
  this.hooks.on(`build.output.publicPath`, value)
  return this
}

const normalizePath = (
  value:
    | ((publicPath: string | undefined) => string | undefined)
    | string
    | undefined,
) => {
  if (isFunction(value)) return value
  if (isUndefined(value)) return value

  if (!isString(value)) {
    throw BudError.normalize(
      `setPublicPath: expected string or function, received ${typeof value}`,
      {
        docs: new URL(`https://budjs.org/docs/bud.setPublicPath`),
        thrownBy: import.meta.url,
      },
    )
  }

  return !value.endsWith(`/`) ? value.concat(`/`) : value
}
