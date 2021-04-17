import {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'

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
    export type {Alias}
  }
}

export type Alias = (
  alias: Webpack.Configuration['resolve']['alias'],
) => Framework

export const alias: Alias = function (alias) {
  !this.store.has('args.resolve.alias') &&
    this.store.merge('options.resolve.alias', alias)

  return this
}
