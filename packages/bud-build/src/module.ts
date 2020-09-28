import Bud from '@roots/bud-types'

const module: Bud.Build.Module = bud =>
  bud.hooks.filter('webpack.module', {
    module: bud.hooks.filter('webpack.module.rules', {
      rules: [
        {parser: {requireEnsure: false}},
        {
          oneOf: [
            ...bud.rules.entries().reduce(
              (
                a: Bud.Build.Configuration['module']['rules'],
                [key, rule]: [string, CallableFunction],
              ) => [
                ...a,
                bud.hooks.filter(
                  `webpack.module.rules.${key}`,
                  typeof rule == 'function'
                    ? rule(bud)
                    : (() => {
                        console.error(rule)
                        process.exit(1)
                      })(),
                ),
              ],
              [],
            ),
          ],
        },
      ],
    }),
  })

export {module as default}
