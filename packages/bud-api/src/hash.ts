import {Api} from '@roots/bud-typings'

export const hash: Api.Hash = function (enabled?) {
  this.features.set('hash', enabled ?? true)

  return this
}
