/* eslint-disable @typescript-eslint/no-var-requires */
import {lodash as _} from '@roots/bud-support'
import {Bud} from '@roots/bud-typings'
import {Extension} from '@roots/bud-extensions'

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
  this: Bud,
  extensions: Extensions,
): Bud {
  _.isString(extensions)
    ? this.extensions.use(extensions)
    : ensureIterable(extensions).forEach(
        (
          extension:
            | string
            | [
                string,
                (
                  | Extension.Interface
                  | ((bud: Bud) => Extension.Interface)
                ),
              ],
        ) => {
          if (!_.isArray(extension)) {
            return this.extensions.use(extension)
          }

          return this.extensions.set(
            ...(extension as [string, Extension.Interface]),
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

export type Extensions =
  | string
  | string[]
  | [
      string,
      Extension.Interface | ((bud: Bud) => Extension.Interface),
    ]
  | [
      string,
      Extension.Interface | ((bud: Bud) => Extension.Interface),
    ][]
