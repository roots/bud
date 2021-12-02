import {
  Framework,
  InjectClient,
  Webpack,
} from './inject-client.interface'

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const injectClient: InjectClient = (app, injection) => {
  const addScript = async (
    entry: Webpack.Entry,
  ): Promise<Webpack.Entry> => {
    return entry
      ? {
          ...Object.entries(entry).reduce(
            (entries, [name, asset]) => ({
              ...entries,
              [name]: {
                ...(asset ?? {}),
                import: [...(asset.import ?? []), ...injection],
              },
            }),
            {},
          ),
        }
      : {}
  }

  app.root.name !== app.name &&
    app.root.hooks.on('build.entry', async entries => {
      const current = await entries
      return addScript(current)
    })

  app.root.hasChildren &&
    app.root.children?.every(
      (_name: string, child: Framework) => {
        child.hooks.on('build.entry', async entries => {
          const current = await entries
          return addScript(current)
        })
      },
    )
}
