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
const vendor: Vendor = function (
  this: Bud,
  name: string = 'vendor',
) {
  if (this.state?.features?.vendor) {
    this.state.features.vendor = true
  }

  if (this.state?.options?.vendor) {
    this.state.options.vendor.name = name
  }

  return this
}

export {vendor}
