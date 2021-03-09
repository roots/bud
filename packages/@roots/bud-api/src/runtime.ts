import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## runtime  [💁 Fluent]
     *
     * Generate a runtime chunk intended to be inlined on the page.
     *
     * Useful for code splitting and dynamic imports.
     *
     * ### Usage
     *
     * ```js
     * bud.runtime()
     * ```
     */
    runtime: Runtime
  }
}

type Runtime = (
  runtime?: Webpack.Configuration['optimization']['runtimeChunk'],
) => Framework

export const runtime: Runtime = function (runtime) {
  this.store.set('options.runtimeChunk.enabled', true)

  this.hooks.on(
    'webpack.optimization.runtimeChunk',
    () =>
      runtime ?? {
        name: this.store.type('options.runtimeChunk.name'),
      },
  )
  return this
}
