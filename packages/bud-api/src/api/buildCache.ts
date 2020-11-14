import {Bud} from '@roots/bud-typings'

export const buildCache = function (
  this: Bud.Contract,
  path?: string,
): Bud.Contract {
  path && this.config.set('recordsPath', path)

  this.features.set('buildCache', true)

  return this
}
