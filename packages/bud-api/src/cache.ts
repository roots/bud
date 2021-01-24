import {Api} from '@roots/bud-typings'

export const cache: Api.Cache = function (enabled?) {
  enabled && this.options.enable('cache')

  return this
}
