import type {Api as BudApi} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework'

import {ServiceContainer} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'

import * as methods from '../methods/index.js'

/**
 * Bud.API {@link ServiceContainer}
 */
class Api extends ServiceContainer implements BudApi {
  /**
   * {@link ServiceContainer.bootstrap}
   */
  @bind
  public override async bootstrap?(bud: Bud) {
    Object.entries(methods).map(([k, v]: [any, any]) =>
      bud.bindFacade(k, v, bud),
    )
  }
}

export {Api as default}
