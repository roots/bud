export default function (
  this: Framework.Bud,
): Framework.Webpack.RuleSetRule[] {
  return this.hooks
    .filter(
      'build.module.rules.oneOf',
      Object.entries(this.build.rules).reduce(
        (
          rules: Framework.Webpack.RuleSetRule[],
          [, rule]: [
            string,
            {make: () => Framework.Webpack.RuleSetRule},
          ],
        ): Framework.Webpack.RuleSetRule[] => [
          ...rules,
          rule.make(),
        ],
        [],
      ),
    )
    .filter(
      ({enforce}) => enforce !== 'pre',
    ) as Framework.Webpack.RuleSetRule[]
}
