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
 *   '@scripts': app.path('@src', 'scripts'),
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

  Object.entries(alias).map(([k, v]) => {
    if (typeof v === 'string' && k.startsWith('@')) ctx.setPath(k, v)
  })

  const merged = Object.keys(alias).reduce(
    (a, k) => ({...a, [k]: ctx.path(k)}),
    {},
  )

  ctx.hooks.async('build.resolve.alias', async (aliases: Alias) => {
    return {...aliases, ...merged}
  })

  return ctx
}
