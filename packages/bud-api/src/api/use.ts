/* eslint-disable @typescript-eslint/no-var-requires */
import {lodash as _} from '@roots/bud-support'

export const use: Framework.API.Use = function (
  extensions: Extensions,
) {
  const registerFromString = registerStrBinding.bind(this)

  _.isString(extensions)
    ? registerFromString(extensions)
    : ensureIterable(extensions).forEach(extension => {
        if (!_.isArray(extension)) {
          return registerFromString(extension)
        }

        return this.extensions.register(...extension)
      })

  return this
}

/**
 * Register a plugin to be utilized during compilation.
 */
function registerStrBinding(
  this: Framework.Bud,
  pkg: string,
): void {
  const resolved = require.resolve(pkg)

  this.disk.set(pkg, {
    baseDir: this.fs.path.dirname(resolved),
    glob: ['**/*'],
  })

  this.extensions.register(pkg, require(resolved))
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
      (
        | Framework.Extension
        | ((bud: Framework.Bud) => Framework.Extension)
      ),
    ]
  | [
      string,
      (
        | Framework.Extension
        | ((bud: Framework.Bud) => Framework.Extension)
      ),
    ][]
