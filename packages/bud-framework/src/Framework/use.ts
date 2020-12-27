import type {Module, Use} from '@roots/bud-typings'
import {
  isArray,
  isArrayLike,
  isObject,
  isString,
} from '@roots/bud-support'

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

export const use: Use = function (extensions) {
  isString(extensions)
    ? this.extensions.use((extensions as unknown) as string)
    : ensureIterable(extensions).forEach(
        (extension: string | Use.Tuple) => {
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
