import type {Webpack, Bud} from '@roots/bud-typings'

declare type Rule = Webpack.RuleSetRule

declare type BuildOneOf = (this: Bud.App) => Rule[]

declare type OneOfReducer = (
  this: Bud.App,
  rules: Rule[],
  [label, rule]: [string, Rule],
) => Rule[]

/**
 * Filter and reduce rules into  webpack.oneOf array
 */
export const oneOf: BuildOneOf = function () {
  return this.build.rules
    .getEntries()
    .filter(([, {enforce}]: [string, Rule]) => enforce !== 'pre')
    .reduce(reducer.bind(this), [])
}

const hook = label => `webpack.module.rules.oneOf.${label}`
const reducer: OneOfReducer = function (rules, [label, rule]) {
  return [...rules, this.hooks.filter<Rule>(hook(label), rule)]
}
