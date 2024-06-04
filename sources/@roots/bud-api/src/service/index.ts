import type {Api as BudApi} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework'

import * as methods from '@roots/bud-api/methods'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'

/**
 * Bud.API {@link Service}
 */
class Api extends Service implements BudApi {
  /**
   * {@link Service.bootstrap}
   */
  @bind
  public override async bootstrap?(bud: Bud) {
    Object.entries(methods).map(([k, v]: Array<any>) => {
      bud.bindFacade(k, v)
    })
  }
}

export {Api as default}
