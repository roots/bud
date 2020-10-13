import {RuleSetRule} from 'webpack'

export const boot = (bud: Framework.Bud): void => {
  const css = bud.build.getRule('css').use as RuleSetRule[]

  bud.build.mergeRule('css', {
    use: (bud: Framework.Bud) => [
      ...css.splice(0, css.length - 1),
      bud.build.getItem('postcss'),
      ...css.splice(css.length - 1),
    ],
  })
}
