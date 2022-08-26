import type {Config} from '@roots/bud-framework'

export const mergeOptions: (
  context: Config.Context,
  overrides: Config.Overrides,
) => Config.Context = (context, overrides) => {
  return {
    ...context,
    ...(overrides ?? {}),
    basedir: overrides?.basedir ?? context.basedir ?? process.cwd(),
    label:
      overrides?.label ??
      context.label ??
      context.manifest?.name ??
      `default`,
    mode:
      overrides?.mode ??
      overrides?.args?.mode ??
      context?.mode ??
      context?.args?.mode ??
      `production`,
    root: overrides?.root ?? undefined,
    args: {
      ...context.args,
      ...(overrides?.args ?? {}),
    },
    extensions: Array.from(
      new Set([...context.extensions, ...(overrides?.extensions ?? [])]),
    ),
    services: Array.from(
      new Set([...context.services, ...(overrides?.services ?? [])]),
    ),
    stdout: overrides?.stdout ?? context?.stdout ?? process.stdout,
    stderr: overrides?.stderr ?? context?.stderr ?? process.stderr,
    stdin: overrides?.stdin ?? context?.stdin ?? process.stdin,
    colorDepth: 256,
  }
}
