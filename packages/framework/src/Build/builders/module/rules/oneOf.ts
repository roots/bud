import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return Object.entries(this.build.rules)
    .reduce(
      (
        rules: Webpack.RuleSetRule[],
        [label, rule]: [string, Framework.Rule],
      ): Webpack.RuleSetRule[] => [
        ...rules,
        this.hooks.filter(
          `webpack.module.rules.oneOf.${label}`,
          rule.make(),
        ),
      ],
      [],
    )
    .filter(
      ({enforce}) => enforce !== 'pre',
    ) as Webpack.RuleSetRule[]
}
