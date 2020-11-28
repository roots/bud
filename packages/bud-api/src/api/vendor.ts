import {Bud} from '@roots/bud-typings'

export const vendor: Vendor = function () {
  this.features.enable('splitChunks')
  return this
}

export type Vendor<T = Bud.Contract> = (this: T) => T
