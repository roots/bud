export const vendor: Vendor = function () {
  this.features.set('vendor', true)

  return this
}

export type Vendor<T = Framework.Bud.Contract> = (this: T) => T
