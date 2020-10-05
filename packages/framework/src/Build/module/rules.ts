import Bud from '../../Bud'
import Webpack from 'webpack'

function rules(
  this: Bud,
): Webpack.Configuration['module']['rules'] {
  const parser: Webpack.RuleSetRule['parser'] = this.hooks.filter(
    'build.module.rules.parser',
    {
      requireEnsure: false,
    },
  )

  const rules: Webpack.RuleSetRule[] = this.hooks.filter(
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
