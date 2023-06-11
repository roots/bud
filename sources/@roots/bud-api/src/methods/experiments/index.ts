import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

export type Parameters<
  T extends `${keyof Configuration[`experiments`]}` = `${keyof Configuration[`experiments`]}`,
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
  if (params.length === 1) {
    this.hooks.on(`build.experiments`, (experiments = {}) => ({
      ...experiments,
      ...params[0],
    }))
  } else if (typeof params[0] === `string`) {
    this.hooks.on(`build.experiments`, (experiments = {}) => ({
      ...experiments,
      [`${params[0]}`]: params[1],
    }))
  }

  return this
}
