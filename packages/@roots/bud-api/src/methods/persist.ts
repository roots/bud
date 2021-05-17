import {Api} from '@roots/bud-framework'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## persist  [💁 Fluent]
     *
     * Cache webpack builds. Useful for
     * situations that may otherwise require
     * brittle relative paths.
     *
     * ### Usage
     *
     * ```js
     * app.persist({
     *   type: 'memory',
     * })
     * ```
     */
    persist: Api.Persist
  }

  namespace Api {
    type Persist = (
      cache: Webpack.Configuration['cache'],
    ) => Framework
  }
}

const persist: Api.Persist = function (cache) {
  this.hooks.on('build/cache', () => cache)

  return this
}

export {persist}
