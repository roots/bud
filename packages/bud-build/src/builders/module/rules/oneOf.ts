import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.build.rules
    .entries()
    .filter(([, {enforce}]) => enforce !== 'pre')
    .reduce(
      (
        rules: Webpack.RuleSetRule[],
        [label, rule]: [string, Webpack.RuleSetRule],
      ): Webpack.RuleSetRule[] => [
        ...rules,
        this.hooks.filter<Webpack.RuleSetRule>(
          `webpack.module.rules.oneOf.${label}`,
          rule,
        ),
      ],
      [],
    )
}
