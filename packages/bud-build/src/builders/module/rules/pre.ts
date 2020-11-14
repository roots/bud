import type Framework from '@roots/bud-typings'

export default function (
  this: Framework.Bud.Contract,
): Framework.Webpack.RuleSetRule[] {
  return this.hooks.filter(
    `webpack.module.rules.pre`,
    this.build.rules
      .getEntries()
      .filter(([, {enforce}]) => enforce == 'pre')
      .reduce(
        (
          rules: Framework.Webpack.RuleSetRule[],
          [, rule]: [string, Framework.Webpack.RuleSetRule],
        ): Framework.Webpack.RuleSetRule[] => [...rules, rule],
        [],
      ),
  ) as Framework.Webpack.Configuration['module']['rules']
}
