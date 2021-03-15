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
  this.publish({
    'options/runtimeChunk/enabled': () => true,
  })

  this.hooks.on(
    'build/optimization/runtimeChunk',
    () =>
      runtime ?? {
        name: this.subscribe('options/runtimeChunk/name'),
      },
  )
  return this
}
