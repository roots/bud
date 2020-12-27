import Service from './Item'
import {Item} from '@roots/bud-typings'

/**
 * Webpack RuleSetUseItem
 */
export default class extends Service implements Item {
  /**
   * Register item module
   */
  public register(module: Item.Module): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Make an item for use in a rule.
   */
  public make(): Item.RuleSetLoader {
    return (
      ['ident', 'query', 'loader', 'options']
        // First out nullish values, etc.
        .filter(prop => this.hasProp(`module.${prop}`))
        .reduce(
          (
            rulesetloader: Item.RuleSetLoader,
            prop: string,
          ): Item.RuleSetLoader => {
            return {
              ...rulesetloader,
              [prop]: this[prop],
            }
          },
          {},
        )
    )
  }
}
