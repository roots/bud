import Bud from '@roots/bud-types'

const moduleBuilder: Bud.Build.General = function (this: Bud) {
  return this.hooks.filter('webpack.module', {
    module: this.hooks.filter('webpack.module.rules', {
      rules: [
        {parser: {requireEnsure: false}},
        {
          oneOf: [
            ...this.rules
              .entries()
              .reduce(
                (
                  a: Bud.Build.Configuration['module']['rules'],
                  [, rule]: [string, CallableFunction],
                ) => [...a, rule(this)],
                [],
              ),
          ],
        },
      ],
    }),
  })
}

export {moduleBuilder as default}
