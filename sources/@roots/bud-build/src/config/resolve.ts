import type {Factory} from '@roots/bud-build/config'

import isString from '@roots/bud-support/isString'

export const resolve: Factory<`resolve`> = async bud => {
  return await bud.hooks.filterAsync(`build.resolve`, {
    alias: {
      '@src': bud.path(`@src`),
      ...(await bud.hooks.filterAsync(`build.resolve.alias`, {})),
    },

    extensionAlias: await bud.hooks.filterAsync(
      `build.resolve.extensionAlias`,
      {
        [`.js`]: [`.ts`, `.tsx`, `.js`, `.jsx`],
        [`.mjs`]: [`.mts`, `.mtx`, `.mjs`],
      },
    ),

    extensions: Array.from(
      bud.hooks.filter(
        `build.resolve.extensions`,
        new Set([`.js`, `.mjs`, `.css`]),
      ),
    ),

    modules: await bud.hooks.filterAsync(
      `build.resolve.modules`,
      [
        bud.hooks.filter(`location.@src`),
        bud.hooks.filter(`location.@modules`),
      ].filter(v => isString(v) && v.length > 0),
    ),

    symlinks: bud.hooks.filter(`build.resolve.symlinks`, undefined),

    /**
     * Leave `undefined` to use webpack default (true in dev, false in production)
     */
    unsafeCache: bud.hooks.filter(`build.module.unsafeCache`, undefined),
  })
}
