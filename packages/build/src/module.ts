import Bud from '@roots/bud-types'

const moduleBuilder: Bud.Build.Module = function (this: Bud) {
  return this.hooks.filter('webpack.module', {
    module: this.hooks.filter('webpack.module.rules', {
      rules: [
        {parser: {requireEnsure: false}},
        {
          oneOf: [
            ...this.store['rules']
              .entries()
              .reduce(
                (
                  all: Bud.Build.Configuration['module']['rules'],
                  [, rule]: [
                    string,
                    {make: () => Bud.Use.Product},
                  ],
                ) => [...all, rule.make()],
                [],
              ),
          ],
        },
      ],
    }),
  })
}

export {moduleBuilder as default}
