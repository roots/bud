import {resolve} from 'path'

import type {Configuration, Framework} from './alias.interface'

export interface alias {
  (alias: Configuration['resolve']['alias']): Framework
}

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
 * @public @config
 */
export const alias: alias = function (alias) {
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

  this.hooks.on(
    'build.resolve.alias',
    async (aliases: Configuration['resolve']['alias']) => {
      const current = await aliases
      return {
        ...current,
        ...mergeAliases,
      }
    },
  )

  return this
}
