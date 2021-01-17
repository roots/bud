import {Api} from '@roots/bud-typings'

export const runtime: Api.Runtime = function () {
  this.options.set('runtimeChunk', true)

  return this
}
