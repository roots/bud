import type {Bud} from '@roots/bud-framework'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 */
export abstract class Hooks<Store> {
  /**
   * Hooks store
   */
  public store: Store

  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    this.store = {} as Store
  }

  /**
   * Get app
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Get logger
   */
  public get logger() {
    return logger.scope(`hooks`)
  }

  @bind
  public catch(e: Error, id?: string, iteration?: number): never {
    if (!id) {
      throw BudError.normalize(e, {
        details: `An error occured while running a hook`,
        thrownBy: import.meta.url,
      })
    }

    throw BudError.normalize(e, {
      details: `An error occured while running hook id: ${id}`,
      thrownBy: import.meta.url,
    })
  }

  /**
   * Check if a hook has been set somewhere
   */
  @bind
  public has<T extends keyof Store & string>(path: T): boolean {
    return !isUndefined(this.store?.[path])
  }
}
