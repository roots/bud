import {resolve} from 'path'

import type {Alias, Framework, method} from './alias.interface'

/**
 * Register shorthand for resolving modules using webpack aliases.
 *
 * @remarks
 * Useful for situations that may otherwise require brittle relative paths.
 *
 * @example
 * ```js
 * app.alias({
 *   '@scripts': app.path('src', 'scripts'),
 * })
 * ```
 *
 * @param alias - module redirections
 * @returns configuration instance
 *
 * @public
 */
export const alias: method = function (alias: Alias) {
  this as Framework

  const mergeAliases = Object.entries(alias).reduce(
    (a, [k, v]: [string, string]) => {
      const path = resolve(this.path('project'), v)

      this.api.log('success', {
        message: `alias ${k}`,
        suffix: path,
      })

      return {
        ...a,
        [k]: resolve(this.path('project'), v),
      }
    },
    {},
  )

  this.hooks.on('build.resolve.alias', async (aliases: Alias) => {
    return {
      ...aliases,
      ...mergeAliases,
    }
  })

  return this
}
