/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
const vendor = function (name: string = 'vendor'): bud {
  this.features.vendor = true
  this.options.vendor.name = name

  return this
}

export {vendor}
import type {bud} from '..'
