import {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## splitChunks
     *
     * Useful for bundling vendor modules separately from application code.
     *
     * ### Usage
     *
     * ```js
     * bud.splitChunks({
     *  chunks: 'all',
     * })
     * ```
     */
    splitChunks: Framework.Api.SplitChunks
  }

  namespace Framework.Api {
    type SplitChunks = (
      this: Framework,
      options?: Framework.Api.SplitChunks.Options,
    ) => Framework

    namespace SplitChunks {
      type Options =
        Webpack.Configuration['optimization']['splitChunks']
    }
  }
}

export const splitChunks: Framework.Api.SplitChunks = function (
  options,
) {
  this.hooks.on(
    'build/optimization/splitChunks',
    options ?? this.store.get('build.optimization.splitChunks'),
  )

  return this
}
