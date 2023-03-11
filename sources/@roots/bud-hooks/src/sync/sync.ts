import type {Bud} from '@roots/bud-framework/bud'
import type {
  SyncCallback,
  SyncRegistry,
  SyncStore,
} from '@roots/bud-framework/registry'
import type Value from '@roots/bud-framework/value'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

import {Hooks} from '../base/base.js'

/**
 * Synchronous hooks registry
 */
export class SyncHooks extends Hooks<SyncStore> {
  /**
   * Set a value
   */
  @bind
  public set<T extends `${keyof SyncStore & string}`>(
    id: T,
    ...input: Array<SyncCallback[T]>
  ): Bud {
    if (!this.has(id)) this.store[id] = []

    input.map(this.app.value.make).map((value: Value<SyncCallback[T]>) => {
      if (typeof value.get() === `function`) this.store[id].push(value)
      else this.store[id] = [value]
    })

    return this.app
  }

  /**
   * Set multiple values
   */
  @bind
  public setRecords(map: Partial<SyncCallback>): Bud {
    Object.entries(map).map(([k, v]: any) => this.set(k, v))
    return this.app
  }

  /**
   * Get a value
   */
  @bind
  public get<T extends `${keyof SyncRegistry & string}`>(
    id: T,
    fallback?: SyncCallback[T],
  ) {
    return [this.app.value.make(fallback), ...(this.store[id] ?? [])]
      .map(this.app.value.get)
      .reduce((accumulated, current) =>
        isFunction(current) ? current(accumulated) : current,
      )
  }
}
