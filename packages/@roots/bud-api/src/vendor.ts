import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## vendor  [💁 Fluent]
     *
     * Bundle vendored modules separately from application code
     *
     * ### Usage
     *
     * ```js
     * bud.vendor()
     * ```
     *
     * Optionally, give the vendor bundle a specific name:
     *
     * ```js
     * bud.vendor('third-party')
     * ```
     */
    vendor: Vendor
  }

  namespace Framework.Api {
    export {Vendor}
  }
}

type Vendor = (this: Framework) => Framework

export const vendor: Vendor = function () {
  this.options.enable('vendor')
  return this
}
