import {Api} from '@roots/bud-framework'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## externals
     *
     * Specify a non-standard resolution strategy for modules
     * with a matching name.
     *
     * ### Usage
     *
     * ```js
     * bud.externals({
     *   'jQuery': 'window.jquery',
     * })
     */
    externals: Api.Externals
  }

  namespace Api {
    type Externals = (
      externals: Webpack.Configuration['externals'],
    ) => Framework
  }
}

const externals: Api.Externals = function (externals) {
  this.hooks.on(
    'build/externals',
    (existant: Webpack.Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Webpack.Configuration['externals']),
  )

  return this
}

export {externals}
