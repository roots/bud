import {isString} from 'lodash-es'

import type {Bud} from '../bud.js'
import type {Locations} from '../registry/locations.js'

export interface setPath {
  <T extends `${keyof Locations & string}`>(
    arg1: T | Partial<Record<T, string>>,
    arg2?: string,
  ): Bud
}

/**
 * Set a {@link Locations} value
 *
 * @remarks
 * All {@link Locations} values should be relative to the project directory
 *
 * @example
 * ```js
 * bud.setPath('@src', 'custom/src')
 * ```
 *
 * @param arg1 - path handler
 * @param arg2 - path value
 *
 * @public
 */
export const setPath: setPath = function (arg1, arg2) {
  const app = this as Bud

  const input = isString(arg1) ? {[arg1]: arg2} : arg1

  Object.entries(input).map(
    ([key, value]: [
      `${keyof Locations & string}`,
      (
        | `${keyof Locations & string}`
        | `@file`
        | `@name`
        | `${keyof Locations & string}/${string}`
        | `./${string}`
        | `/${string}`
      ),
    ]) => {
      !key.startsWith(`@`) &&
        app.error(
          `bud path keys should start with \`@\`. Please change \`${key}\` to \`@${key}\``,
        )

      const absolutePath = app.path(value)
      !absolutePath.startsWith('/') &&
        app.error(
          `internal error: the final result of a bud.setPath transform was not absolute: ${key} => ${value} => ${absolutePath}`,
        )

      app.hooks.on(`location.${key}`, app.path(value))
      app.info(`${key} set to ${value}`)
    },
  )

  return app
}
