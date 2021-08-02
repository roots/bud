/**
 * @module @roots/bud
 */

import {
  Build as Base,
  Item,
  items,
  Loader,
  loaders,
  Rule,
  rules,
} from '@roots/bud-build'

/**
 * Service: Build
 */
class Build extends Base {}

export {Build, Item, Rule, Loader}
export {items, rules, loaders}
