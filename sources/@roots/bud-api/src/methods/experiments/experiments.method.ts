import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

export interface experiments {
  <T extends `${keyof Configuration[`experiments`] & string}`>(
    input: Record<T, Configuration[`experiments`][T]>,
  ): Bud
}

export const experiments: experiments = function (input): Bud {
  const app = this as Bud

  app.hooks.on(`build.experiments`, experiments => ({
    ...(experiments ?? {}),
    ...input,
  }))

  return app
}
