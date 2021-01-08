import {Api} from '@roots/bud-typings'

export const hash: Api.Hash = function (enabled?) {
  this.store.enabled('features.hash')

  return this
}
