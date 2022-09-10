import {Extension} from '@roots/bud-framework'
import {label, plugin} from '@roots/bud-framework/extension/decorators'

import FixStyleOnlyEntrypoints from './plugin.js'

/**
 * `fix-style-only-entrypoints` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 */
@label(`fix-style-only-entrypoints`)
@plugin(FixStyleOnlyEntrypoints)
export default class BudFixStyleOnlyEntrypoints extends Extension {}
