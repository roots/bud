import type {Config} from '@roots/bud-framework'

import {extensions} from '../extensions/index.js'
import {seed} from '../seed.js'
import {services} from '../services/index.js'

export const mergeOptions: (
  context: Config.Context,
  overrides?: Partial<Config.Options>,
) => Config.Options = (context, overrides) => ({
  name: 'bud',
  mode: 'production',
  dir: process.cwd(),
  ...(overrides ?? {}),
  context: {
    ...context,
    ...(overrides?.context ?? {}),
    args: {
      ...(context.args ?? {}),
      ...(overrides?.context?.args ?? {}),
    },
  },
  seed: {
    ...seed,
    ...(overrides?.seed ?? {}),
  },
  services: {
    ...services,
    ...(overrides?.services ?? {}),
  },
  extensions: [...(extensions ?? []), ...(overrides?.extensions ?? [])],
})
