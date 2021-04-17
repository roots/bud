import {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.externals  [💁 Fluent]
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
    export {Externals}
  }
}

type Externals = (
  externals: Webpack.Configuration['externals'],
) => Framework

export const externals: Externals = function (externals) {
  this.hooks.on('build/externals', () => externals)

  return this
}
