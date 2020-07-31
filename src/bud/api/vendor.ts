import type {Bud, Vendor} from './Types'

const vendor: Vendor = function (this: Bud, name: string) {
  this.features.enable('vendor')
  this.options.set('vendor', {
    ...this.options.get('vendor'),
    name: name ?? 'vendor',
  })

  return this
}

export {vendor}
