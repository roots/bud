import type {Framework} from '@roots/bud-framework'
import {resolve} from 'path'
import type {Configuration} from 'webpack'

/**
 * Register shorthand for resolving modules using webpack aliases.
 *
 * @remarks
 * Useful for situations that may otherwise require brittle relative paths.
 *
 * @usage
 * ```js
 * app.alias({
 *   '@scripts': app.path('src', 'scripts'),
 * })
 * ```
 */
interface alias {
  (
    this: Framework,
    alias: Configuration['resolve']['alias'],
  ): Framework
}

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

export {alias}
