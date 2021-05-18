import {Api} from '@roots/bud-framework'
import {resolve} from 'path'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## alias
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
    type Alias = (alias: Alias.Schema) => Framework
    namespace Alias {
      type Schema = Webpack.Configuration['resolve']['alias']
    }
  }
}

const alias: Api.Alias = function (alias) {
  this.hooks.on(
    'build/resolve/alias',
    (aliases: Api.Alias.Schema) => ({
      ...aliases,
      ...Object.entries(alias).reduce(
        (a, [k, v]) => ({
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
