import type {Config} from '@roots/bud-framework'

import {seed} from '../seed.js'

export const mergeOptions: (
  context: Partial<Config.Context>,
  overrides?: Partial<Config.Context>,
) => Partial<Config.Context> = (context, overrides) => ({
  label:
    overrides?.label ??
    context?.label ??
    context.manifest?.name ??
    `default`,
  basedir: overrides?.basedir ?? context?.basedir ?? process.cwd(),
  mode: overrides?.mode ?? context?.mode ?? `production`,
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
  services: (() => {
    ;(overrides?.services ?? [])
      .filter(service => !context?.services.includes(service))
      .map(service => context.services.push(service))
    return context.services
  })(),
  extensions: (() => {
    ;(overrides?.extensions ?? [])
      .filter(service => !context?.extensions.includes(service))
      .map(service => context.extensions.push(service))
    return context.extensions
  })(),
  stdout: overrides?.stdout ?? context?.stdout ?? process.stdout,
  stderr: overrides?.stderr ?? context?.stderr ?? process.stderr,
  stdin: overrides?.stdin ?? context?.stdin ?? process.stdin,
})
