import Bud from './../Bud'
import Webpack from 'webpack'

const rulesets: Bud.Build.Module = function (webpack) {
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
                  all: Webpack.RuleSetRule[],
                  [, rule]: [
                    string,
                    {make: () => Webpack.RuleSetRule},
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

export {rulesets as default}
