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
  const addScript = (entry: Webpack.Entry): Webpack.Entry => ({
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
    app.root.hooks.on('build.entry', addScript)

  app.root.children.every((_name: string, child: Framework) => {
    child.hooks.on('build.entry', addScript)
  })
}
