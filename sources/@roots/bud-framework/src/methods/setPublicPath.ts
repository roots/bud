import {sep} from 'node:path'

import type {Bud} from '../bud.js'

export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Bud
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
  const app = this as Bud

  app.hooks.on(`build.output.publicPath`, publicPath)

  // Normalize the publicPath in case the user did not end it with a slash.
  app.hooks.on(`build.output.publicPath`, value => {
    if (value === `` || value === `auto`) return value
    return !value.endsWith(sep) ? `${value}${sep}` : value
  })

  return app
}
