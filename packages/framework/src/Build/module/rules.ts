import Webpack from 'webpack'

function rules(
  this: Framework.Bud,
): Webpack.Configuration['module']['rules'] {
  const parser = this.hooks.filter('build.module.rules.parser', {
    requireEnsure: false,
  })

  const rules = this.hooks.filter(
    'build.module.rules.oneOf',
    this.components['rules'].entries().reduce(ruleReducer, []),
  ) as Webpack.RuleSetRule[]

  return [{parser}, {oneOf: rules}]
}

function ruleReducer(
  rules: Webpack.RuleSetRule[],
  [, rule]: [string, {make: () => Webpack.RuleSetRule}],
): Webpack.RuleSetRule[] {
  return [...rules, rule.make()]
}

export {rules as default}
