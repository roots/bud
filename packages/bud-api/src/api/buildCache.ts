import {Bud} from '@roots/bud-typings'

export const buildCache = function (
  this: Bud,
  path?: string,
): Bud {
  path && this.config.set('recordsPath', path)

  this.features.enable('buildCache')

  return this
}
