import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
import {BudError} from '@roots/bud-support/errors'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 */
export abstract class Hooks<Store> {
  /**
   * Get app
   */
  public get app(): Bud {
    return this._app()
  }

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
   * Check if a hook has been set somewhere
   */
  @bind
  public has<T extends keyof Store & string>(path: T): boolean {
    return isUndefined(this.store[path]) === false
  }

  @bind
  public catch(e: Error, id?: string, iteration?: number): void {
    throw new BudError(`problem running hook ${id}`, {cause: e})
  }
}
