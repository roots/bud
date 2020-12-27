import {Api} from '@roots/bud-typings'

export const runtime: Api.Runtime = function () {
  this.features.set('runtimeChunk', true)

  return this
}
