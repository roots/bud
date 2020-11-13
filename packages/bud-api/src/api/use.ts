/* eslint-disable @typescript-eslint/no-var-requires */
import {lodash as _} from '@roots/bud-support'
import {Bud, Extension} from '@roots/bud-typings'

/**
 * Register an extension or set of extensions to use.
 *
 * Extensions can be specified by:
 *
 * - a resolvable package name
 * - an array of resolvable package names
 * - a module path
 * - an array of module paths
 * - extension object formatted as a tuple [extension name, object]
 * - an array of extension objects in the same tuple format.
 */
export const use = function (
  this: Bud.Contract,
  extensions: Extensions,
): Bud.Contract {
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
  Extension.Contract | ((bud: Bud) => Extension.Contract),
]

export type Extensions =
  | string
  | string[]
  | ExtensionTuple
  | ExtensionTuple[]
