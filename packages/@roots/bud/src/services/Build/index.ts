import {
  Build as Base,
  Item,
  items,
  Loader,
  loaders,
  Rule,
  rules,
} from '@roots/bud-build'
import type {
  Build as Contract,
  Framework,
} from '@roots/bud-framework'

/**
 * Builds the Webpack configuration object
 *
 * @remarks
 * 📝 For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link loaders} should be declared by augmenting the {@link Framework.Loaders} interface
 * - {@link items} should be declared by augmenting the {@link Framework.Items} interface
 * - {@link rules} should be declared by augmenting the {@link Framework.Rules} interface
 *
 * 👀 A lot of `@roots/bud` extensions do this as well, if you are looking for an example of
 * how to add to an external interface definition
 *
 * @sealed
 * @public
 */
class Build extends Base implements Contract {
  /**
   * Service identifier
   */
  public name = 'build'

  /**
   * Registered loaders
   */
  public loaders: Framework.Loaders

  /**
   * Registered rules
   */
  public rules: Framework.Rules

  /**
   * Registered items
   */
  public items: Framework.Items
}
export {Build, Item, Rule, Loader}
export {items, rules, loaders}
