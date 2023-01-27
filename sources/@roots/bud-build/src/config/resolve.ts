import type {Bud} from '@roots/bud-framework'

import type {Factory} from './index.js'

export const resolve: Factory<`resolve`> = async bud => {
  const modules = await getModules(bud)
  const value = {
    alias: await getAlias(bud),
    extensions: getExtensions(bud),
    modules,
  }

  return await bud.hooks.filterAsync(`build.resolve`, value)
}

const getAlias = async (bud: Bud) =>
  await bud.hooks.filterAsync(`build.resolve.alias`, {
    '@src': bud.path(`@src`),
  })

const getExtensions = (bud: Bud) =>
  Array.from(
    bud.hooks.filter(
      `build.resolve.extensions`,
      new Set([
        `.mjs`,
        `.js`,
        `.jsx`,
        `.css`,
        `.json`,
        `.wasm`,
        `.yml`,
        `.yaml`,
        `.xml`,
        `.toml`,
        `.csv`,
      ]),
    ),
  )

const getModules = async (bud: Bud) =>
  await bud.hooks.filterAsync(`build.resolve.modules`, [
    bud.hooks.filter(`location.@src`),
    bud.hooks.filter(`location.@modules`),
  ])
