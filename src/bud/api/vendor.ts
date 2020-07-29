import type {Bud, Vendor} from './Types'

const vendor: Vendor = function (this: Bud, name: string) {
  this.features.enable('vendor')
  this.state.options.vendor.name = name ?? 'vendor'

  return this
}

export {vendor}
