import type {Vendor} from './Types'

/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
const vendor: Vendor = function (name: string = 'vendor') {
  this.state.features.vendor = true
  this.state.options.vendor.name = name

  return this
}

export {vendor}
