import type {Webpack, Framework} from '@roots/bud-typings'

declare type Rule = Webpack.RuleSetRule

declare type Build = (this: Framework) => Rule[]

declare type Reducer = (
  this: Framework,
  rules: Rule[],
  [label, rule]: [string, Rule],
) => Rule[]

const hook = (label: string) =>
  `webpack.module.rules.oneOf.${label}`

const reducer: Reducer = function (rules, [label, rule]) {
  return [...rules, this.hooks.filter<Rule>(hook(label), rule)]
}

/**
 * Filter and reduce rules into  webpack.oneOf array
 */
export const oneOf: Build = function () {
  return this.build.rules
    .getEntries()
    .filter(([, {enforce}]: [string, Rule]) => enforce !== 'pre')
    .reduce(reducer.bind(this), [])
}
