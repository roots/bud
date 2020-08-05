import type {Bud, Vendor} from './Types'

const vendor: Vendor = function (this: Bud, name: string) {
  this.logger.info({name: 'bud.api', function: 'bud.vendor', options: {name}}, `bud.vendor called`)

  this.features.enable('vendor')
  this.options.set('vendor', {
    ...this.options.get('vendor'),
    name: name ?? 'vendor',
  })

  return this
}

export {vendor}
