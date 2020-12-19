/* eslint-disable @typescript-eslint/no-var-requires */
import {
  isArray,
  isArrayLike,
  isObject,
  isString,
} from '@roots/bud-support'
import type {Bud, Extension} from '@roots/bud-typings'

export const use: Use = function (extensions) {
  isString(extensions)
    ? this.extensions.use(extensions as string)
    : ensureIterable(extensions).forEach(
        (extension: string | ExtensionTuple) => {
          if (isString(extension)) {
            return this.extensions.use(extension as string)
          }

          return this.extensions.set(
            ...(extension as [string, Extension.Module]),
          )
        },
      )

  return this
}

/**
 * Duck typing extension tuple format.
 */
function ensureIterable(extensions) {
  return isArray(extensions) &&
    extensions[0] &&
    extensions[1] &&
    !isArray(extensions[0]) &&
    isObject(extensions[1]) &&
    !isArrayLike(extensions[1])
    ? [extensions]
    : extensions
}

export type ExtensionTuple = [
  string,
  Extension.Module | ((bud: Bud) => Extension.Module),
]

export type Use<T = Bud> = (
  this: T,
  extensions:
    | string
    | string[]
    | ExtensionTuple
    | ExtensionTuple[],
) => T
