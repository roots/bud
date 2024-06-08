import type {Bud} from '@roots/bud-framework'

import isString from '@roots/bud-support/isString'

export interface setPublicPath {
  (
    publicPath:
      | ((publicPath: string | undefined) => string | undefined)
      | string,
  ): Bud
}

/**
 * Set the application public path (e.g. `/assets`)
 *
 * @remarks
 * The default public path is `/`
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
  this.hooks.on(`build.output.publicPath`, normalizePath(publicPath))

  return this
}

const normalizePath = (
  value: ((publicPath: string) => string) | string = `auto`,
) => {
  if (!isString(value)) return value
  if (value === `` || value === `auto`) return value

  return !value.endsWith(`/`) ? value.concat(`/`) : value
}
