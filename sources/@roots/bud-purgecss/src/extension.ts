import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

import {purgecss} from './api.js'

/**
 * ## purgecss configuration
 */
@label(`@roots/bud-purgecss`)
@dependsOn([`@roots/bud-postcss`])
export default class BudPurgeCSS extends Extension {
  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    bud.bindFacade(`purgecss`, purgecss)
  }
}
