import type {Bud} from '@roots/bud-framework'

/**
 * Inject webpack entrypoints with client scripts
 */
export const inject = async (
  app: Bud,
  injection: Array<(app: Bud) => string>,
) => {
  app.hooks.on(`build.entry`, entrypoints => {
    if (!injection) return entrypoints

    return Object.entries(entrypoints ?? {}).reduce(
      (entrypoints, [name, entry]) => {
        name = name ?? `main`

        return {
          ...entrypoints,
          [name]: {
            ...(entry ?? {}),
            import: [
              ...(entry?.import ?? `index`),
              ...injection.map(fn => fn(app)),
            ].filter(Boolean),
          },
        }
      },
      {},
    )
  })
}
