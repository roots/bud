import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

export type Parameters<
  T extends `${keyof Configuration[`experiments`] &
    string}` = `${keyof Configuration[`experiments`] & string}`,
> = [
  Partial<Configuration[`experiments`]> | T,
  Configuration[`experiments`][T]?,
]

export interface experiments {
  (...parameters: Parameters): Bud
}

export const experiments: experiments = function (
  this: Bud,
  ...params
): Bud {
  if (typeof params[0] === `object`) {
    const experimentsObject = params[0] as Configuration[`experiments`]

    this.hooks.on(`build.experiments`, (experiments = {}) => ({
      ...experiments,
      ...experimentsObject,
    }))
  } else {
    this.hooks.on(`build.experiments`, (experiments = {}) => ({
      ...experiments,
      [`${params[0]}`]: params[1],
    }))
  }

  return this
}
