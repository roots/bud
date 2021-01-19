import {Api} from '@roots/bud-typings'
import {bud} from '../../bud/lib/types'

export const cache: Api.Cache = function (enabled?) {
  enabled && bud.options.enable('cache')

  return this
}
