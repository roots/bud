import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export const module = async (
  app: Bud,
): Promise<Configuration['module']> => {
  const rules = []
  rules.push(
    ...app.hooks.filter(`build.module.rules.before`, [
      {
        include: [app.path(`@src`)],
        parser: {requireEnsure: false},
      },
    ]),
    {
      oneOf: app.hooks.filter(
        `build.module.rules.oneOf`,
        Object.values(app.build.rules).map(rule => rule.toWebpack()),
      ),
    },
    ...app.hooks.filter(`build.module.rules.after`, []),
  )

  return app.hooks.filter(`build.module`, {
    noParse: app.hooks.filter(`build.module.noParse`, undefined),
    rules: rules,
    unsafeCache: app.hooks.filter(`build.module.unsafeCache`, false),
  })
}
