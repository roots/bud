import type {Api} from '@roots/bud-types'

const hash: Api.Hash = function () {
  this.features.set('hash', true)

  return this
}

export {hash}
