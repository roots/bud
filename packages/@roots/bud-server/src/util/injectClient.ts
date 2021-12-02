import {Framework, InjectClient} from './inject-client.interface'

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const injectClient: InjectClient = (app, injection) => {
  const addScript = async (
    entry: Record<
      string,
      {
        import?: string[]
        dependsOn?: string[]
      }
    >,
  ) => ({
    ...(entry
      ? Object.entries(entry).reduce(
          (entries, [name, asset]) => ({
            ...entries,
            [name]: {
              ...asset,
              import: [...(asset.import ?? []), ...injection],
            },
          }),
          {},
        )
      : {
          app: {
            import: ['index.js', ...injection],
          },
        }),
  })

  !app.root.hasChildren &&
    app.root.hooks.filterAsync<'build.entry'>(
      'build.entry',
      async entries => {
        const current = await entries
        return addScript(current)
      },
    )

  app.root.hasChildren &&
    app.root.children?.every(
      (_name: string, child: Framework) => {
        child.hooks.filterAsync<'build.entry'>(
          'build.entry',
          async entries => {
            const current = await entries
            return addScript(current)
          },
        )
      },
    )
}
