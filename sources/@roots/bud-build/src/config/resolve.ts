import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-support/webpack'

const getAlias = async (
  app: Bud,
): Promise<Configuration['resolve']['alias']> =>
  await app.hooks.filterAsync(`build.resolve.alias`, undefined)

const getExtensions = async (
  app: Bud,
): Promise<Configuration['resolve']['extensions']> =>
  Array.from(app.hooks.filter(`build.resolve.extensions`, new Set()))

const getModules = async (
  app: Bud,
): Promise<Configuration['resolve']['modules']> =>
  await app.hooks.filterAsync(`build.resolve.modules`)

export const resolve = async (
  app: Bud,
): Promise<Configuration['resolve']> => {
  const alias = await getAlias(app)
  const extensions = await getExtensions(app)
  const modules = await getModules(app)

  const resolve = {alias, extensions, modules}

  return await app.hooks.filterAsync(`build.resolve`, resolve)
}
