import type {Bud} from '@roots/bud-framework'
import type {
  AsyncCallback,
  AsyncRegistry,
  AsyncStore,
} from '@roots/bud-framework/registry'

import {bind} from '@roots/bud-support/decorators/bind'
import isFunction from '@roots/bud-support/lodash/isFunction'
import Value from '@roots/bud-support/value'

import {Hooks} from '../base/base.js'

/**
 * Asynchronous hooks registry
 */
export class AsyncHooks extends Hooks<AsyncStore> {
  /**
   * Get a value
   */
  @bind
  public async get<T extends keyof AsyncRegistry & string>(
    id: T,
    fallback?: AsyncRegistry[T],
  ): Promise<AsyncRegistry[T]> {
    return await [Value.make(fallback), ...(this.store[id] ?? [])]
      .map(Value.get)
      .reduce(async (accumulated, current) => {
        const previous = await accumulated
        return isFunction(current) ? await current(previous) : current
      })
  }

  /**
   * Set a value
   */
  @bind
  public set<T extends keyof AsyncStore & string>(
    id: T,
    ...input: AsyncCallback[T]
  ): Bud {
    if (!this.has(id)) this.store[id] = []

    input.map(Value.make).map((value: Value<AsyncCallback[T]>) => {
      if (typeof value.get() === `function`) this.store[id].push(value)
      else this.store[id] = [value]
    })

    return this.app
  }

  /**
   * Set multiple values
   */
  @bind
  public setRecords(map: Partial<AsyncCallback>): Bud {
    Object.entries(map).map(([k, v]: any) => this.set(k, v))
    return this.app
  }
}
