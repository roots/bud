import {Framework, InjectClient} from './inject-client.interface'

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 *
 * @public
 */
export const injectClient: InjectClient = async (
  app,
  injection,
): Promise<void> => {
  const injectInstance = async (instance: Framework) => {
    const entrypoints =
      await instance.hooks.filterAsync<'build.entry'>(
        'build.entry',
      )

    instance.hooks.on('build.entry', () =>
      Object.entries(entrypoints).reduce(
        (entrypoints, [name, entry]) => {
          entry.import = [...(entry.import ?? []), ...injection]
          return {...entrypoints, [name]: entry}
        },
        {},
      ),
    )
  }

  if (!app.root.hasChildren) {
    await injectInstance(app.root)
  }

  if (app.root.hasChildren) {
    await Promise.all(
      Object.values(app.root.children).map(injectInstance),
    )
  }
}
