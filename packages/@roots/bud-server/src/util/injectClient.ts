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
  ): Promise<Webpack.Entry> => ({
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
    app.root.hooks.promise('build.entry', async entries => {
      const current = await entries
      return addScript(current)
    })

  app.root.children.every((_name: string, child: Framework) => {
    child.hooks.promise('build.entry', async entries => {
      const current = await entries
      return addScript(current)
    })
  })
}
