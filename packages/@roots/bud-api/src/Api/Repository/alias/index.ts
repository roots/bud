import type {Framework} from '@roots/bud-framework'
import {resolve} from 'path'
import type {Configuration} from 'webpack'

interface alias {
  (
    this: Framework,
    alias: Configuration['resolve']['alias'],
  ): Framework
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
const alias: alias = function (alias) {
  this.hooks.on(
    'build/resolve/alias',
    (aliases: Configuration['resolve']['alias']) => ({
      ...aliases,
      ...Object.entries(alias).reduce(
        (a, [k, v]: [string, string]) => ({
          ...a,
          [k]: resolve(v),
        }),
        {},
      ),
    }),
  )

  return this
}

export {alias as default}
