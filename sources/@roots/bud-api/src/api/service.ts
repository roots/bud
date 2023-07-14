import type {Api as BudApi} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework'

import {ServiceContainer} from '@roots/bud-framework/service'

import * as methods from '../methods/index.js'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 */
export class Api extends ServiceContainer implements BudApi {
  /**
   * {@link BudApi.label}
   */
  public override label: BudApi[`label`] = `api`

  /**
   * `bootstrap` callback
   */
  public override async bootstrap?(bud: Bud) {
    Object.entries(methods).map(([k, v]) => bud.bindFacade(k as any, v))
  }
}
