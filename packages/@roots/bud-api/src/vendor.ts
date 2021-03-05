import {Framework} from '@roots/bud-framework'
import {merge, Webpack} from '@roots/bud-support'

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

type Vendor = (
  vendorOptions?: Webpack.Options.CacheGroupsOptions,
) => Framework

export const vendor: Vendor = function (vendorOptions) {
  this.store.enable('options.vendor')

  vendorOptions &&
    this.hooks.on(
      'webpack.optimization.splitChunks.vendor',
      (opts: Webpack.Options.CacheGroupsOptions) =>
        merge(opts, vendorOptions),
    )

  return this
}
