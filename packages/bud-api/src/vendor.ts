import {Api} from '@roots/bud-typings'

export const vendor: Api.Vendor = function () {
  this.store.enable('features.splitChunks')

  return this
}
