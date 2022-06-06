// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Configuration builder
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import * as items from './handlers/items.js'
import * as loaders from './handlers/loaders.js'
import * as rules from './handlers/rules.js'
import Item from './item.js'
import Loader from './loader.js'
import Rule from './rule.js'
import {Build} from './service.js'

export {
  Build,
  Build as Service,
  Build as default,
  Loader,
  Item,
  Rule,
  items,
  loaders,
  rules,
}
