import {Bud} from '@roots/bud-typings'

export const buildCache: BuildCache = function (path?) {
  path && this.config.set('recordsPath', path)

  this.features.set('buildCache', true)

  return this
}

export type BuildCache = (
  this: Bud.Contract,
  path?: string,
) => Bud.Contract
