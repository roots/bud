import Bud from '../Bud'

import Webpack from 'webpack'

const rulesets: Bud.Build.Module = function () {
  const parser = this.hooks.filter('build.module.parser', {
    requireEnsure: false,
  })

  const rules = this.hooks.filter(
    'build.module.rules',
    this.components['rules']
      .entries()
      .reduce(
        (
          all: Webpack.RuleSetRule[],
          [, rule]: [string, {make: () => Webpack.RuleSetRule}],
        ) => [...all, rule.make()],
        [],
      ),
  )

  return this.hooks.filter('build.module', {
    module: {
      rules: [{parser}, {oneOf: rules}],
    },
  })
}

export {rulesets as default}
