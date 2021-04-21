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
    persist: Api.Persist
  }

  namespace Api {
    export type {Persist}
  }
}

export type Persist = (
  cache: Webpack.Configuration['cache'],
) => Framework

export const persist: Persist = function (cache) {
  this.hooks.on('build/cache', () => cache)

  return this
}
