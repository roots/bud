import {Api} from '@roots/bud-typings'

export const runtime: Api.Runtime = function () {
  this.options.enable('runtime')

  return this
}
