import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
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
   *
   * @public
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Hooks store
   *
   * @public
   */
  public store: Store

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public _app: () => Bud) {
    this.store = {} as Store
  }

  /**
   * Check if a hook has been set somewhere
   * @public
   */
  @bind
  public has<T extends keyof Store & string>(path: T): boolean {
    return isUndefined(this.store[path]) === false
  }
}
