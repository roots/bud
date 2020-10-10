import Webpack from 'webpack'

export default function rules(
  this: Framework.Bud,
): Webpack.Configuration['module']['rules'] {
  const parser = this.hooks.filter('build.module.rules.parser', {
    requireEnsure: false,
  })

  const rules = this.hooks.filter(
    'build.module.rules.oneOf',
    this.components['rules']
      .entries()
      .reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, {make: () => Webpack.RuleSetRule}],
        ): Webpack.RuleSetRule[] => [...rules, rule.make()],
        [],
      ),
  ) as Webpack.RuleSetRule[]

  return [{parser}, {oneOf: rules}]
}
