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

import {Build} from './Build/index.js'
import Item from './Item/index.js'
import * as items from './items.js'
import Loader from './loader.js'
import * as loaders from './loaders.js'
import Rule from './Rule/index.js'
import * as rules from './rules.js'

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
