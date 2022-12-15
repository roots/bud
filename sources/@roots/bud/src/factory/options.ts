import type {Context, Overrides} from '@roots/bud-framework/options'

export const merge: (context: Context, overrides: Overrides) => Context = (
  context,
  overrides,
) => {
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
    manifest: {
      ...(context?.manifest ?? {}),
      ...(overrides?.manifest ?? {}),
    },
    root: overrides?.root ?? undefined,
    args: {
      ...context.args,
      ...(overrides?.args ?? {}),
    },
    extensions: {
      builtIn: Array.from(
        new Set([
          ...context.extensions.builtIn,
          ...(overrides?.extensions?.builtIn ?? []),
        ]),
      ),
      discovered: Array.from(
        new Set([
          ...context.extensions.discovered,
          ...(overrides?.extensions?.discovered ?? []),
        ]),
      ),
    },
    services: Array.from(
      new Set([...context.services, ...(overrides?.services ?? [])]),
    ),
    stdout: overrides?.stdout ?? context?.stdout ?? process.stdout,
    stderr: overrides?.stderr ?? context?.stderr ?? process.stderr,
    stdin: overrides?.stdin ?? context?.stdin ?? process.stdin,
    colorDepth: 256,
  }
}
