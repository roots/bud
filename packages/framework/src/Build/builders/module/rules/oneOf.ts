import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return Object.entries(this.build.rules)
    .reduce(
      (
        rules: Webpack.RuleSetRule[],
        [, rule]: [string, Framework.Rule],
      ): Webpack.RuleSetRule[] => [...rules, rule.make()],
      [],
    )
    .filter(
      ({enforce}) => enforce !== 'pre',
    ) as Webpack.RuleSetRule[]
}
