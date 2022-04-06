import {Bud} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isNull, isUndefined} = lodash

export interface inject {
  (
    app: Bud,
    injection: Array<(app: Bud) => string>,
  ): Promise<void>
}

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const inject: inject = async (instance: Bud, injection) => {
  instance.hooks.on('build.entry', entrypoints => {
    const invalidEntrypoints =
      !entrypoints ||
      isUndefined(entrypoints) ||
      isNull(entrypoints) ||
      !injection

    if (invalidEntrypoints) {
      instance.warn(
        `${instance.name} entrypoints are malformed`,
        `skipping inject`,
      )

      return entrypoints
    }

    return Object.entries(entrypoints).reduce(
      (entrypoints, [name, entry]) => {
        if (!entry) return entrypoints

        entry.import = Array.from(
          new Set([
            ...injection.map(inject => inject(instance)),
            ...(entry.import ?? []),
          ]),
        )

        return {...entrypoints, [name]: entry}
      },
      {},
    )
  })
}
