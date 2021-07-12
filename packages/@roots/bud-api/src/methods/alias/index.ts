import {resolve} from 'path'
import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

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
    alias: Framework.Api.Alias
  }

  namespace Framework.Api {
    export type Alias = (
      this: Framework,
      alias: Webpack.Configuration['resolve']['alias'],
    ) => Framework
  }
}

const alias: Framework.Api.Alias = function (alias) {
  this.hooks.on(
    'build/resolve/alias',
    (aliases: Webpack.Configuration['resolve']['alias']) => ({
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
