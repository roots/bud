import {Framework} from '@roots/bud-framework'
import {isNull, isUndefined} from 'lodash'

export interface inject {
  (
    app: Framework,
    injection: Array<(app: Framework) => string>,
  ): Promise<void>
}

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const inject: inject = async (
  instance: Framework,
  injection,
) => {
  instance.hooks.on('build.entry', entrypoints => {
    if (instance.hasChildren) {
      instance.log(
        `${instance.name} is a parent compiler`,
        `skipping inject`,
      )
      return entrypoints
    }

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

        entry.import = [
          ...new Set([
            ...injection.map(inject => inject(instance)),
            ...(entry.import ?? []),
          ]),
        ]

        return {...entrypoints, [name]: entry}
      },
      {},
    )
  })
}
