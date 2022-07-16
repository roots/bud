import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface externals {
  (externals: Configuration['externals']): Bud
}

export const externals: externals = function (externals) {
  this as Bud

  this.hooks.on(
    `build.externals`,
    (existant: Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Configuration['externals']),
  )

  return this
}
