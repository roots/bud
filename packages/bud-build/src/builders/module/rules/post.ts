import type {Bud, Webpack} from '@roots/bud-typings'

export default function (
  this: Bud.Contract,
): Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.post`,
    this.build.rules
      .getEntries()
      .filter(
        ([, {enforce}]: [string, Webpack.RuleSetRule]) =>
          enforce == 'post',
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
