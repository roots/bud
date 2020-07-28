import type {Bud, Vendor} from './Types'

/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
const vendor: Vendor = function (this: Bud, name: string) {
  this.state.features.vendor = true
  this.state.options.vendor.name = name ?? 'vendor'

  return this
}

export {vendor}
