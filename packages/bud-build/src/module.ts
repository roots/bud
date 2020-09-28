import Bud from '@roots/bud-types'

const module: Bud.Build.Module = function (this: Bud) {
  return this.hooks.filter('webpack.module', {
    module: this.hooks.filter('webpack.module.rules', {
      rules: [
        {parser: {requireEnsure: false}},
        {
          oneOf: [
            ...this.rules.entries().reduce(
              (
                a: Bud.Build.Configuration['module']['rules'],
                [key, rule]: [string, CallableFunction],
              ) => [
                ...a,
                this.hooks.filter(
                  `webpack.module.rules.${key}`,
                  typeof rule == 'function'
                    ? rule(this)
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
}

export {module as default}
