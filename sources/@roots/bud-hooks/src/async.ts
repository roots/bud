import type {
  AsyncCallback,
  AsyncRegistry,
  AsyncStore,
} from '@roots/bud-framework/registry'
import type {Bud} from '@roots/bud-framework/src'
import {bind} from 'helpful-decorators'
import {isFunction, isUndefined} from 'lodash-es'

import Hooks from './base.js'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 *
 * @public
 */
export default class Async extends Hooks<AsyncStore> {
  /**
   * Register a function to filter a value.
   *
   * @remarks
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.key',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof AsyncStore & string>(
    id: T,
    input: AsyncCallback[T],
  ): Bud {
    const value = this.app.value.make(input)
    this.store[id] = [...(this.store[id] ?? []), value] as AsyncStore[T]
    return this.app
  }

  @bind
  public setRecords(map: Partial<AsyncCallback>): Bud {
    Object.entries(map).map(([k, v]: any) => this.set(k, v))
    return this.app
  }

  /**
   * Asyncronous hook filter
   *
   * @remarks
   * This method is used to filter a hook event.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.Key.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
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
