import type {Bud} from '@roots/bud-framework/bud'
import type {
  SyncCallback,
  SyncRegistry,
  SyncStore,
} from '@roots/bud-framework/registry'
import {bind} from '@roots/bud-support/decorators'
import {isFunction} from '@roots/bud-support/lodash-es'

import Hooks from './base.js'

/**
 * Synchronous hooks registry
 *
 * @public
 */
export default class Sync extends Hooks<SyncStore> {
  /**
   * Set a value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof SyncStore & string>(
    id: T,
    input: SyncCallback[T],
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
  public setRecords<K extends keyof SyncRegistry & string>(
    map: Partial<SyncCallback>,
  ): Bud {
    Object.entries(map).map(([k, v]: [K, SyncRegistry[K]]) =>
      this.set(k, v),
    )

    return this.app
  }

  /**
   * Get a value
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

    return (this.store[id] ?? [])
      .map(this.app.value.get)
      .reduce(
        (accumulated, current) =>
          isFunction(current) ? current(accumulated) : current,
        fallback,
      )
  }
}
