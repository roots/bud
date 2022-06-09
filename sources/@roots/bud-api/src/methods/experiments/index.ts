import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface experiments {
  <T extends keyof Configuration['experiments']>(
    input: Record<T, Configuration['experiments'][T & string]>,
  ): Bud
}

export const experiments: experiments = function <
  T extends keyof Configuration['experiments'],
>(input: Record<T, Configuration['experiments'][T & string]>): Bud {
  const app = this as Bud

  Object.entries(input).map(
    ([k, v]: [keyof Configuration['experiments'], any]) =>
      app.hooks.on(
        `build.experiments.${k}`,
        v as Configuration['experiments'][T & string],
      ),
  )

  return app
}
