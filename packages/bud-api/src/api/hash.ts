import {Framework} from '@roots/bud-typings'

export const hash: Hash = function (enabled?) {
  this.features.set('hash', enabled ?? true)

  return this
}

export type Hash = (
  this: Framework,
  enabled?: boolean,
) => Framework
