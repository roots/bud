import type {Bud} from '@roots/bud-framework'
import type {
  AsyncCallback,
  AsyncRegistry,
  AsyncStore,
} from '@roots/bud-framework/registry'
import type Value from '@roots/bud-framework/value'
import {bind} from '@roots/bud-support/decorators'
import {isFunction} from '@roots/bud-support/lodash-es'

import {Hooks} from '../base/base.js'

/**
 * Asynchronous hooks registry
 *
 * @public
 */
export class AsyncHooks extends Hooks<AsyncStore> {
  /**
   * Set a value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof AsyncStore & string>(
    id: T,
    ...input: AsyncCallback[T]
  ): Bud {
    if (!this.has(id)) this.store[id] = []

    input
      .map(this.app.value.make)
      .map((value: Value<AsyncCallback[T]>) => {
        if (typeof value.get() === `function`) this.store[id].push(value)
        else this.store[id] = [value]
      })

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
    return await [this.app.value.make(fallback), ...(this.store[id] ?? [])]
      .map(this.app.value.get)
      .reduce(async (accumulated, current) => {
        const previous = await accumulated
        return isFunction(current) ? await current(previous) : current
      })
  }
}
