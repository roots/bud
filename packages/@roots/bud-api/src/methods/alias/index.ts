import {Api} from '@roots/bud-framework'
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
    alias: Api.Alias
  }

  namespace Api {
    type Alias = (
      alias: Webpack.Configuration['resolve']['alias'],
    ) => Framework
  }
}

export const alias: Api.Alias = function (alias) {
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
