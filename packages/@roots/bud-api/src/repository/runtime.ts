import type {Framework} from '@roots/bud-framework'
import {isUndefined} from 'lodash'
import type Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## runtime
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
    runtime: Framework.Api.Runtime
  }

  namespace Framework.Api {
    type Runtime = (
      this: Framework,
      runtime?: Webpack.Configuration['optimization']['runtimeChunk'],
    ) => Framework
  }
}

const DEFAULT_OPTIONS: Webpack.Configuration['optimization']['runtimeChunk'] =
  {
    name: (entrypoint: Webpack.EntryObject) =>
      `runtime/${entrypoint.name}`,
  }

export const runtime: Framework.Api.Runtime = function (
  runtime?,
) {
  this.hooks.on('build/optimization/runtimeChunk', () =>
    !isUndefined(runtime) ? runtime : DEFAULT_OPTIONS,
  )

  return this
}
