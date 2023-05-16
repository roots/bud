import type {Factory} from './index.js'

export const resolve: Factory<`resolve`> = async bud => {
  const compilerOptions =
    bud.context.files[`tsconfig.json`]?.module?.compilerOptions ??
    bud.context.files[`jsconfig.json`]?.module?.compilerOptions

  const aliases = compilerOptions?.paths
    ? Object.entries(compilerOptions.paths)
        .map(([k, v]: [string, Array<string>]) => [k, v[0]])
        .map(tuple => tuple.map((str: string) => str.replace(`/*`, ``)))
        .reduce(
          (acc, [key, value]): Record<string, string> => ({
            ...(acc ?? {}),
            [key]: compilerOptions.baseUrl
              ? bud.path(compilerOptions.baseUrl, value)
              : bud.path(value),
          }),
          {'@src': bud.path(`@src`)},
        )
    : {}

  return await bud.hooks.filterAsync(`build.resolve`, {
    alias: await bud.hooks.filterAsync(`build.resolve.alias`, aliases),
    extensionAlias: await bud.hooks.filterAsync(
      `build.resolve.extensionAlias`,
      {
        [`.js`]: [`.ts`, `.tsx`, `.js`],
        [`.mjs`]: [`.mts`, `.mtx`, `.mjs`],
      },
    ),
    extensions: Array.from(
      bud.hooks.filter(
        `build.resolve.extensions`,
        new Set([`.js`, `.mjs`, `.jsx`, `.cjs`, `.css`]),
      ),
    ),
    modules: await bud.hooks.filterAsync(`build.resolve.modules`, [
      bud.hooks.filter(`location.@src`),
      bud.hooks.filter(`location.@modules`),
    ]),
    unsafeCache: bud.hooks.filter(`build.module.unsafeCache`, false),
  })
}
