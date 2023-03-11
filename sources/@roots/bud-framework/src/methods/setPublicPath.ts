import {sep} from 'node:path'

import type {Bud} from '../bud.js'

/**
 * ## bud.setPublicPath
 * @see {@link https://bud.js.org/docs/bud.setPublicPath}
 */
export interface setPublicPath {
  (publicPath: string | ((publicPath: string) => string)): Bud
}

/**
 * ## bud.setPublicPath
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
