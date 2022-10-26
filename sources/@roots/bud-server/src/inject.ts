import type {Bud} from '@roots/bud-framework'

/**
 * Inject webpack entrypoints with client scripts
 *
 * @public
 */
export const inject = (
  app: Bud,
  injection: Array<(app: Bud) => string>,
): void => {
  app.hooks.on(`build.entry`, entrypoints => {
    if (!injection) return entrypoints

    entrypoints = !entrypoints ? {app: {import: [`index`]}} : entrypoints

    return Object.entries(entrypoints).reduce(
      (entrypoints, [name, entry]) => {
        if (!entry) return entrypoints

        return {
          ...entrypoints,
          [name]: {
            ...entry,
            import: [
              ...injection.map(fn => fn(app)),
              ...entry.import,
            ].filter(Boolean),
          },
        }
      },
      {},
    )
  })
}
