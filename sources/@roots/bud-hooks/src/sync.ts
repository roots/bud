import type {
  SyncCallback,
  SyncRegistry,
  SyncStore,
} from '@roots/bud-framework/registry'
import type {Bud} from '@roots/bud-framework/src'
import {bind} from 'helpful-decorators'
import {isFunction} from 'lodash-es'

import Hooks from './base.js'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 *
 * @public
 */
export default class Sync extends Hooks<SyncStore> {
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
  public set<T extends keyof SyncStore>(
    id: T,
    input: SyncCallback[T],
  ): Bud {
    const value = this.app.value.make(input)
    if (this.store[id]) this.store[id].push(value)
    else this.store[id] = [value]
    return this.app
  }

  /**
   * Set multiple hooks at once.
   *
   * @param map - Hooks map
   * @public
   */
  @bind
  public setRecords<K extends keyof SyncRegistry>(
    map: Partial<SyncCallback>,
  ): Bud {
    Object.entries(map).map(([k, v]: [K, SyncRegistry[K]]) =>
      this.set(k, v),
    )

    return this.app
  }

  /**
   * Filter value
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
  public get<T extends keyof SyncStore & string>(
    id: T,
    fallback?: SyncCallback[T],
  ) {
    if (!this.has(id)) return isFunction(fallback) ? fallback() : fallback

    return this.store[id]
      .map(this.app.value.get)
      .reduce(
        (accumulated, current) =>
          isFunction(current) ? current(accumulated) : current,
        fallback,
      )
  }
}
