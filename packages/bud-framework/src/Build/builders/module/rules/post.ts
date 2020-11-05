import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.post`,
    this.build.rules
      .entries()
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
