import type {Api as BudApi} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework'

import {ServiceContainer} from '@roots/bud-framework/service'

import * as methods from '../methods/index.js'

/**
 * Bud.API {@link ServiceContainer}
 */
class Api extends ServiceContainer implements BudApi {
  /**
   * {@link BudApi.label}
   */
  public override label: BudApi[`label`] = `api`

  /**
   * {@link ServiceContainer.bootstrap}
   */
  public override async bootstrap?(bud: Bud) {
    Object.entries(methods).map(([k, v]: [any, any]) =>
      bud.bindFacade(k, v, bud),
    )
  }
}

export {Api as default}
