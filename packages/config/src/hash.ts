import Bud from '@roots/bud-types'

export const hash: Bud.Config.Hash = function () {
  this.store['features'].set('hash', true)

  return this
}
