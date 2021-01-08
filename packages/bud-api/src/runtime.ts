import {Api} from '@roots/bud-typings'

export const runtime: Api.Runtime = function () {
  this.store.set('features.runtimeChunk', true)

  return this
}
