import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'

import FixStyleOnlyEntrypoints from './plugin.js'

/**
 * Fix style only entrypoints
 */
@label(`@roots/bud-extensions/fix-style-only-entrypoints`)
@plugin(FixStyleOnlyEntrypoints)
export default class BudFixStyleOnlyEntrypoints extends Extension {
  /**
   * When
   */
  public override when(bud: Bud): boolean {
    if (this.enabled === true) return true

    if (bud.isDevelopment) return false

    const entrypoints = bud.hooks.filter(`build.entry`, undefined)

    if (!entrypoints) return false

    if (
      !Object.values(entrypoints).every(value =>
        value.import.every(entry => entry.endsWith(`.css`)),
      )
    ) {
      return false
    }

    return true
  }
}
