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

// Fallback value
const fallback: Webpack.Configuration['optimization']['runtimeChunk'] = {
  name: entrypoint => `runtime/${entrypoint.name}`,
}

export const runtime: Runtime = function (runtime = fallback) {
  this.store.enable('options.runtime')

  this.hooks.on(
    'webpack.optimization.runtimeChunk',
    () => runtime,
  )
  return this
}
