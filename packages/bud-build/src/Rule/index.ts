import Service from './Rule'
import {Rule, Webpack} from '@roots/bud-typings'

export default class extends Service implements Rule {
  /**
   * Register rule.
   */
  public register(rule: Rule.Module): this {
    Object.entries(rule).map(([prop, source]) => {
      this[prop] = source
    })

    return this
  }

  /**
   * Make rule.
   */
  public make(): Webpack.RuleSetRule {
    return this.props
      .filter((prop: string) => this.hasProp(`module.${prop}`))
      .reduce(
        (rulesetrule: Webpack.RuleSetRule, prop: string) => ({
          ...rulesetrule,
          [prop]: this[prop],
        }),
        {},
      )
  }
}
