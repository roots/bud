import {
  isArray,
  isArrayLike,
  isObject,
  isString,
} from '@roots/bud-support'
import type {Framework, Module} from '@roots/bud-typings'

export const use: Use = function (extensions) {
  isString(extensions)
    ? this.extensions.use(extensions as string)
    : ensureIterable(extensions).forEach(
        (extension: string | ExtensionTuple) => {
          if (isString(extension)) {
            return this.extensions.use(extension as string)
          }

          return this.extensions.set(
            ...(extension as [string, Module]),
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
  Module | ((bud: Framework) => Module),
]

export type Use = (
  this: Framework,
  extensions:
    | string
    | string[]
    | ExtensionTuple
    | ExtensionTuple[],
) => Framework
