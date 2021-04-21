import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
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
    runtime: Api.Runtime
  }

  namespace Api {
    export {Runtime}
  }
}

type Runtime = (
  runtime?: Webpack.Configuration['optimization']['runtimeChunk'],
) => Framework

const DEFAULT_OPTIONS: Webpack.Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: Webpack.EntryObject) =>
    `runtime/${entrypoint.name}`,
}

export const runtime: Runtime = function (runtime) {
  this.hooks.on(
    'build/optimization/runtimeChunk',
    () => runtime ?? DEFAULT_OPTIONS,
  )

  return this
}
