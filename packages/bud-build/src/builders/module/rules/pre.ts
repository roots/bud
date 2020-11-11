import type Webpack from 'webpack'

export default function (
  this: Framework.Bud,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.pre`,
    this.build.rules
      .entries()
      .filter(([, {enforce}]) => enforce == 'pre')
      .reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, Webpack.RuleSetRule],
        ): Webpack.RuleSetRule[] => [...rules, rule],
        [],
      ),
  )
}
