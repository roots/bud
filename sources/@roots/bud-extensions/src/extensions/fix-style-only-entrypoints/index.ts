import {Extension} from '@roots/bud-framework'
import {
  label,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'

import FixStyleOnlyEntrypoints from './plugin.js'

/**
 * Fix style only entrypoints
 */
@label(`@roots/bud-extensions/fix-style-only-entrypoints`)
@plugin(FixStyleOnlyEntrypoints)
@production
export default class BudFixStyleOnlyEntrypoints extends Extension {}
