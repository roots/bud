import type {Config} from '@roots/bud-framework'

import extensions from '../extensions/index.js'
import {seed} from '../seed.js'
import {services} from '../services/index.js'

export const mergeOptions: (
  context: Partial<Config.Context>,
  overrides?: Partial<Config.Context>,
) => Partial<Config.Context> = (context, overrides) => ({
  label: 'default',
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
  extensions: [...extensions, ...(overrides?.extensions ?? [])].filter(
    Boolean,
  ),
})
