import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.post`,
    Object.entries(this.build.rules)
      .reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, {make: () => Webpack.RuleSetRule}],
        ): Webpack.RuleSetRule[] => [...rules, rule.make()],
        [],
      )
      .filter(
        ({enforce}) => enforce == 'post',
      ) as Webpack.RuleSetRule[],
  )
}
