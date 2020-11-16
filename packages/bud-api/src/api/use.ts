/* eslint-disable @typescript-eslint/no-var-requires */
import {lodash as _} from '@roots/bud-support'
import {Bud, Extension} from '@roots/bud-typings'

export const use: Use = function(extensions) {
  _.isString(extensions)
    ? this.extensions.use(extensions)
    : ensureIterable(extensions).forEach(
        (extension: string | ExtensionTuple) => {
          if (!_.isArray(extension)) {
            return this.extensions.use(extension)
          }

          return this.extensions.set(
            ...(extension as [string, Extension.Contract]),
          )
        },
      )

  return this
}

/**
 * Duck typing extension tuple format.
 */
function ensureIterable(extensions) {
  return _.isArray(extensions) &&
    extensions[0] &&
    extensions[1] &&
    !_.isArray(extensions[0]) &&
    _.isObject(extensions[1]) &&
    !_.isArrayLike(extensions[1])
    ? [extensions]
    : extensions
}

export type ExtensionTuple = [
  string,
  (
    | Extension.Contract
    | ((bud: Bud.Contract) => Extension.Contract)
  ),
]

export type Use<T = Bud.Contract> = (
  this: T,
  extensions:
    | string
    | string[]
    | ExtensionTuple
    | ExtensionTuple[],
) => T
