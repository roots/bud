import type {Bud} from '@roots/bud-framework'
import {isNull, isUndefined} from 'lodash-es'

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
    if (!injection) return

    if (app.isRoot) {
      const missing =
        !entrypoints || isUndefined(entrypoints) || isNull(entrypoints)

      entrypoints = missing ? {app: {import: [`index`]}} : entrypoints
    }

    entrypoints = {
      ...entrypoints,
      [`dev-client`]: {
        import: injection.map(inject => inject(app)).filter(Boolean),
      },
    }

    return Object.entries(entrypoints).reduce(
      (entrypoints, [name, entry]) => {
        if (!entry) return entrypoints

        if (name !== `dev-client`)
          entry.dependOn = [`dev-client`, ...(entry.dependOn ?? [])]

        return {...entrypoints, [name]: entry}
      },
      {},
    )
  })
}
