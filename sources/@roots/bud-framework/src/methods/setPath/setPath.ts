import {isAbsolute, normalize} from 'node:path'

import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Bud} from '../../bud.js'
import type * as Locations from '../../types/registry/locations.js'

export type Parameters =
  | [string]
  | [string, string]
  | [Record<string, string>]

export interface setPath {
  (...parameters: Parameters): Bud
}

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
 */
export const setPath: setPath = function (this: Bud, ...parameters) {
  const [arg1, arg2] = parameters

  if (isString(arg1) && isUndefined(arg2)) {
    Object.assign(this.context, {basedir: normalize(arg1)})
    return this
  }

  Object.entries(isString(arg1) ? {[arg1]: arg2} : arg1).map(
    ([key, value]: [`${keyof Locations.Sync & string}`, string]) => {
      if (!key.startsWith(`@`)) {
        throw new Error(
          `bud path keys should start with \`@\`. Please change \`${key}\` to \`@${key}\``,
        )
      }

      const path = this.path(value)
      if (isAbsolute(path))
        throw new Error(
          `the final result of a bud.setPath transform was not absolute: ${key} => ${value} => ${path}`,
        )

      this.hooks.on(`location.${key}`, this.path(value))
      this.log(`${key} set to ${value}`)
    },
  )

  return this
}
