import {Api} from '@roots/bud-typings'

export const hash: Api.Hash = function (enabled?) {
  this.options.set('hash', enabled ?? true)

  return this
}
