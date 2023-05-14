import type {Factory} from './index.js'

export const resolve: Factory<`resolve`> = async bud => {
  const paths: Record<string, Array<string>> = {
    ...(bud.context.files[`tsconfig.json`]?.module?.compilerOptions
      ?.paths ?? {}),
    ...(bud.context.files[`jsconfig.json`]?.module?.compilerOptions
      ?.paths ?? {}),
  }

  const aliases = Object.entries(paths).reduce(
    (acc, [key, tsConfValue]): Record<string, string> => {
      const value = tsConfValue[0]

      if (key.includes(`*`) || value.includes(`*`)) {
        return acc
      }

      return {...acc, [key]: bud.path(value)}
    },
    {'@src': bud.path(`@src`)},
  )

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
