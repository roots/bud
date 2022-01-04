import {Framework} from '@roots/bud-framework'

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
  instance.hooks.on('build.entry', entrypoints =>
    Object.entries(entrypoints).reduce(
      (entrypoints, [name, entry]) => {
        entry.import = [
          ...new Set([
            ...injection.map(inject => inject(instance)),
            ...(entry.import ?? []),
          ]),
        ]

        return {...entrypoints, [name]: entry}
      },
      {},
    ),
  )
}
