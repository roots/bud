import {Framework} from '@roots/bud-typings'

export const vendor: Vendor = function () {
  this.features.enable('splitChunks')
  return this
}

export type Vendor = (this: Framework) => Framework
