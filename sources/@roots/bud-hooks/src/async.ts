import type {
  AsyncCallback,
  AsyncRegistry,
  AsyncStore,
} from '@roots/bud-framework/registry'
import type {Bud} from '@roots/bud-framework/src'
import {bind} from '@roots/bud-support/decorators'
import {isFunction, isUndefined} from '@roots/bud-support/lodash-es'

import Hooks from './base.js'

/**
 * Asynchronous hooks registry
 *
 * @public
 */
export default class Async extends Hooks<AsyncStore> {
  /**
   * Set a value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof AsyncStore & string>(
    id: T,
    input: AsyncCallback[T],
  ): Bud {
    if (this.has(id) && isFunction(input)) {
      this.store[id].push(this.app.value.make(input))
    } else {
      this.store[id] = [this.app.value.make(input)]
    }

    return this.app
  }

  /**
   * Set multiple values
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRecords(map: Partial<AsyncCallback>): Bud {
    Object.entries(map).map(([k, v]: any) => this.set(k, v))
    return this.app
  }

  /**
   * Get a value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async get<T extends keyof AsyncRegistry & string>(
    id: T,
    fallback?: AsyncRegistry[T],
  ): Promise<AsyncRegistry[T]> {
    if (isUndefined(this.store[id])) return fallback

    const result = await this.store[id]
      .map(this.app.value.get)
      .reduce(async (accumulated, current) => {
        const thisValue = await accumulated
        return isFunction(current) ? await current(thisValue) : current
      }, fallback)

    return result
  }
}
