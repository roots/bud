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
  const ctx = this as Framework

  const merged = Object.entries(alias).reduce(
    (a, [k, v]: [string, string]) => ({
      ...a,
      [k]: resolve(ctx.path('project'), v),
    }),
    {},
  )

  ctx.hooks.async('build.resolve.alias', async (aliases: Alias) => {
    return {...aliases, ...merged}
  })

  return ctx
}
