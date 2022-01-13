import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface externals {
  (externals: Configuration['externals']): Framework
}

export const externals: externals = function (externals) {
  this as Framework

  this.hooks.on(
    'build.externals',
    (existant: Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Configuration['externals']),
  )

  return this
}
