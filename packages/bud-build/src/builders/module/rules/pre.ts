import type {Framework, Webpack} from '@roots/bud-typings'

export default function (
  this: Framework,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.pre`,
    this.build.rules
      .getEntries()
      .filter(
        ([, {enforce}]: [string, Webpack.RuleSetRule]) =>
          enforce == 'pre',
      )
      .reduce(
        (
          rules: Webpack.RuleSetRule[],
          [, rule]: [string, Webpack.RuleSetRule],
        ): Webpack.RuleSetRule[] => [...rules, rule],
        [],
      ),
  ) as Webpack.Configuration['module']['rules']
}
