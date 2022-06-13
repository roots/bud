import type {Config} from '@roots/bud-framework'

import {extensions} from '../extensions/index.js'
import {seed} from '../seed.js'
import {services} from '../services/index.js'

export const mergeOptions: (
  context: Config.Context,
  overrides?: Config.Options,
) => Config.Options = (context, overrides) => ({
  name: 'bud',
  mode: 'production',
  ...(overrides ?? {}),
  context: {
    ...context,
    ...(overrides?.context ?? {}),
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
