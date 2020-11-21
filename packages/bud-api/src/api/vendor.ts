export const vendor: Vendor = function () {
  this.features.enable('vendor')

  return this
}

export type Vendor<T = Framework.Bud.Contract> = (this: T) => T
