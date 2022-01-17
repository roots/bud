import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface experiments {
  (key: keyof Configuration['experiments'], setting: boolean): Framework
}

export const experiments: experiments = function (
  key,
  setting,
): Framework {
  this as Framework

  this.hooks.on('build.experiments', experiments => {
    return {
      ...(experiments ?? {}),
      [key]: setting,
    }
  })

  return this
}
