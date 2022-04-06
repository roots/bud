import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface experiments {
  (key: keyof Configuration['experiments'], setting: boolean): Bud
}

export const experiments: experiments = function (
  key,
  setting,
): Bud {
  this as Bud

  this.hooks.on('build.experiments', experiments => {
    return {
      ...(experiments ?? {}),
      [key]: setting,
    }
  })

  return this
}
