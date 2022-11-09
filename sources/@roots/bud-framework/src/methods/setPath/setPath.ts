import {normalize} from 'node:path'

import {isString, isUndefined} from '@roots/bud-support/lodash-es'

import type {Bud} from '../../bud.js'
import type * as Locations from '../../types/registry/locations.js'

export interface setPath {
  <T extends `${keyof Locations.Sync & string}`>(
    arg1: T | Partial<Record<T, string>>,
    arg2?: string,
  ): Bud
}

type Value =
  | `${keyof Locations.Sync & string}`
  | `@file`
  | `@name`
  | `${keyof Locations.Sync & string}/${string}`
  | `./${string}`
  | `/${string}`

/**
 * Set a {@link Locations} value
 *
 * @remarks
 * All values should be relative to the project directory.
 *
 * @example
 * Set project path
 * ```js
 * bud.setPath('/app/absolute/path/')
 * ```
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

  if (isString(arg1) && isUndefined(arg2)) {
    Object.assign(app.context, {basedir: normalize(arg1)})
    return app
  }

  const input = isString(arg1) ? {[arg1]: arg2} : arg1

  Object.entries(input).map(
    ([key, value]: [`${keyof Locations.Sync & string}`, Value]) => {
      if (!key.startsWith(`@`)) {
        throw new Error(
          `bud path keys should start with \`@\`. Please change \`${key}\` to \`@${key}\``,
        )
      }

      const absolutePath = app.path(value)

      if (!absolutePath.startsWith(`/`))
        throw new Error(
          `the final result of a bud.setPath transform was not absolute: ${key} => ${value} => ${absolutePath}`,
        )

      app.hooks.on(`location.${key}`, app.path(value))
      app.info(`${key} set to ${value}`)
    },
  )

  return app
}
