import {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'
import {resolve} from 'path'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## alias  [💁 Fluent]
     *
     * Register shorthand for resolving modules
     * using webpack aliases. Useful for
     * situations that may otherwise require
     * brittle relative paths.
     *
     * ### Usage
     *
     * ```js
     * app.alias({
     *   '@scripts': app.path('src', 'scripts'),
     * })
     * ```
     */
    alias: Alias
  }

  namespace Api {
    export type {Alias}
  }
}

export type Alias = (
  alias: Webpack.Configuration['resolve']['alias'],
) => Framework

export const alias: Alias = function (alias): Framework {
  this.hooks.on('build/resolve/alias', existant => ({
    ...existant,
    ...Object.entries(alias).reduce(
      (a, [k, v]) => ({
        ...a,
        [k]: resolve(v),
      }),
      {},
    ),
  }))

  return this
}
