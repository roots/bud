import {Framework} from '@roots/bud-framework'
import {isEqual, Webpack} from '@roots/bud-support'

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
  runtime?:
    | Webpack.Configuration['optimization']['runtimeChunk']
    | false,
) => Framework

export const runtime: Runtime = function (runtime) {
  if (runtime && isEqual(runtime, false)) {
    this.store.set('options.runtimeChunkEnabled', false)

    return this
  }

  this.store.set('options.runtimeChunkEnabled', true)

  runtime &&
    this.publish({
      'build/optimization/runtimeChunk': () => runtime,
    })

  return this
}
