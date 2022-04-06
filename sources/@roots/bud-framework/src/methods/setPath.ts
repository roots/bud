import {lodash} from '@roots/bud-support'

import {Bud, Locations} from '..'

const {isString} = lodash

/**
 * Set a reference to a project path
 *
 * @example
 * ```js
 * bud.setPath('@src', 'custom/src')
 * ```
 *
 * @public
 */
export interface setPath {
  <T extends `${keyof Locations & `@${string}` & string}`>(
    arg1: T | Record<T, string>,
    arg2?: string,
  ): Bud
}

export const setPath: setPath = function (arg1, arg2) {
  const app = this as Bud

  const input = isString(arg1) ? {[arg1]: arg2} : arg1

  Object.entries(input).map(([key, value]) => {
    !key.startsWith(`@`) &&
      app.error(
        `bud paths are required to be prefixed with \`@\`. Please convert \`${key}\` to \`@${key}\``,
      )

    const absolutePath = app.path(value)
    !absolutePath.startsWith('/') &&
      app.error(
        `internal error: the final result of a bud.setPath transform was not absolute: ${key} => ${value} => ${absolutePath}`,
      )

    app.hooks.on(`location.${key}`, app.path(value))
    app.info(`${key} set to ${value}`)
  })

  return app
}
