/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
const vendor = function (name: string = 'vendor'): Bud {
  this.state.features.vendor = true
  this.state.options.vendor.name = name

  return this
}

export {vendor}
import type {Bud} from '..'
