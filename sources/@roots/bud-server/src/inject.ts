import type {Bud} from '@roots/bud-framework'
import {isNull, isUndefined} from 'lodash-es'

export interface inject {
  (app: Bud, injection: Array<(app: Bud) => string>): Promise<void>
}

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const inject: inject = async (
  app: Bud,
  injection: Array<(app: Bud) => string>,
): Promise<void> => {
  app.hooks.on('build.entry', entrypoints => {
    if (!injection) return

    const missing =
      !entrypoints || isUndefined(entrypoints) || isNull(entrypoints)

    entrypoints = missing
      ? {
          app: {
            import: ['index'],
          },
        }
      : entrypoints

    return Object.entries(entrypoints).reduce(
      (entrypoints, [name, entry]) => {
        if (!entry) return entrypoints

        entry.import = Array.from(
          new Set(
            [
              ...injection.map(inject => inject(app)),
              ...(entry.import ?? []),
            ].filter(Boolean),
          ),
        )

        return {...entrypoints, [name]: entry}
      },
      {},
    )
  })
}
