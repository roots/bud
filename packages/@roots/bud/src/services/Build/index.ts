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
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link loaders} should be declared by augmenting the {@link Framework.Loaders} interface
 * - {@link items} should be declared by augmenting the {@link Framework.Items} interface
 * - {@link rules} should be declared by augmenting the {@link Framework.Rules} interface
 *
 * Check out {@link Build the source of Build} for examples. A lot of `@roots/bud` extensions do this
 * as well, if you need an example of how to do it from a package (without overriding this class).
 *
 * @sealed
 * @noInheritDoc
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
