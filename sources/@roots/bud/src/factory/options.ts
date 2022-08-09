import type {Config} from '@roots/bud-framework'

import {extensions} from '../extensions/index.js'
import {seed} from '../seed.js'
import {services} from '../services/index.js'

export const mergeOptions: (
  context: Partial<Config.Options>,
  overrides?: Partial<Config.Options>,
) => Config.Options = (context, overrides) => ({
  name: 'default',
  mode: 'production',
  basedir: process.cwd(),
  ...context,
  ...(overrides ?? {}),
  args: {
    ...(context.args ?? {}),
    ...(overrides?.args ?? {}),
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
