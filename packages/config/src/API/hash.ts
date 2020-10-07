export const hash: API.Hash = function () {
  this.store['features'].set('hash', true)

  return this
}
