import {Bud} from '@roots/bud-typings'

export const target: (
  target: string,
) => Bud.Contract = function (target) {
  this.config.set('target', target)

  return this
}
