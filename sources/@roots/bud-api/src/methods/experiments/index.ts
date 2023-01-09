import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-support/webpack'

export type Parameters<
  T extends `${keyof Configuration[`experiments`] &
    string}` = `${keyof Configuration[`experiments`] & string}`,
> = [Record<T, Configuration[`experiments`][T]>]

export interface experiments {
  (...parameters: Parameters): Bud
}

export const experiments: experiments = function (this: Bud, input): Bud {
  this.hooks.on(`build.experiments`, (experiments = {}) => ({
    ...experiments,
    ...input,
  }))

  return this
}
