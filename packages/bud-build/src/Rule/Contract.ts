import {Framework, Webpack} from '@roots/bud-typings'
import Rule from './'

export default interface Contract {
  bud: Framework

  enforce?: Rule.Enforce

  exclude?: Rule.Conditional

  include?: Rule.Conditional

  issuer?: Rule.Conditional

  oneOf?: Rule.OneOf

  options?: Rule.Options

  parser?: Rule.Parser

  resolve?: Rule.Resolve

  sideEffects?: Rule.SideEffects

  query?: Rule.Query

  type?: Rule.Type

  resource?: Rule.Conditional

  resourceQuery?: Rule.Conditional

  compiler?: Rule.Conditional

  rules?: Rule.OneOf

  test?: Rule.Conditional

  use?: Rule.Use

  register(rule: unknown): Contract

  getProp<T = Rule.Property<Rule.Generic>>(prop: string): T

  setProp<T = Rule.Property<Rule.Generic>>(
    prop: string,
    value: T,
  ): Contract

  get: () => Array<[string, Rule.Generic]>

  make(): Webpack.RuleSetRule
}
