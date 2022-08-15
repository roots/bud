import type {Config} from '@roots/bud-framework'

import extensions from '../extensions/index.js'
import {seed} from '../seed.js'
import {services} from '../services/index.js'

export const mergeOptions: (
  context: Partial<Config.Context>,
  overrides?: Partial<Config.Context>,
) => Partial<Config.Context> = (context, overrides) => ({
  mode: 'production',
  ...context,
  ...(overrides ?? {}),
  args: {
    ...(context.args ?? {}),
    ...(overrides?.args ?? {}),
  },
  seed: {
    ...seed,
    ...(context.seed ?? {}),
    ...(overrides?.seed ?? {}),
  },
  services: {
    ...services,
    ...(context?.services ?? {}),
    ...(overrides?.services ?? {}),
  },
  extensions: [
    ...extensions,
    ...(context?.extensions ?? []),
    ...(overrides?.extensions ?? []),
  ].filter(Boolean),
  stdout: overrides?.stdout ?? context?.stdout ?? process.stdout,
  stderr: overrides?.stderr ?? context?.stderr ?? process.stderr,
  stdin: overrides?.stdin ?? context?.stdin ?? process.stdin,
})
