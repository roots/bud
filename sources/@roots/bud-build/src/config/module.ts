import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface module {
  (app: Bud): Promise<Configuration['module']>
}

export const module: module = async app => {
  const noParse = await getNoParse(app)
  const rules = await getRules(app)
  const unsafeCache = await getUnsafeCache(app)

  const module = {noParse, rules, unsafeCache}
  return app.hooks.filter(`build.module`, module)
}

const getRules = async (
  app: Bud,
): Promise<Configuration['module']['rules']> => {
  const rules = []

  rules.push(
    ...app.hooks.filter(`build.module.rules.before`, [
      {
        include: [app.path(`@src`)],
        parser: {requireEnsure: false},
      },
    ]),
  )

  rules.push({
    oneOf: app.hooks.filter(
      `build.module.rules.oneOf`,
      Object.values(app.build.rules).map(rule => rule.toWebpack()),
    ),
  })

  rules.push(...app.hooks.filter(`build.module.rules.after`, []))

  return rules
}

const getNoParse = async (
  app: Bud,
): Promise<Configuration['module']['noParse']> =>
  app.hooks.filter(`build.module.noParse`, undefined)

const getUnsafeCache = async (
  app: Bud,
): Promise<Configuration['module']['unsafeCache']> =>
  app.hooks.filter(`build.module.unsafeCache`, undefined)
