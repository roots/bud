import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.pre`,
    Object.entries(this.build.rules)
      .reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, {make: () => Webpack.RuleSetRule}],
        ): Webpack.RuleSetRule[] => [...rules, rule.make()],
        [],
      )
      .filter(
        rule => rule.enforce == 'pre',
      ) as Webpack.RuleSetRule[],
  )
}
