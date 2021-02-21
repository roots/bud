import {Framework} from '@roots/bud-framework'

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

type Runtime = () => Framework

export const runtime: Runtime = function () {
  this.options.enable('runtime')

  return this
}
