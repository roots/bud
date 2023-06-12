import type {Bud} from '@roots/bud-framework'
import type {
  SyncCallback,
  SyncRegistry,
  SyncStore,
} from '@roots/bud-framework/registry'

import {bind} from '@roots/bud-support/decorators/bind'
import isFunction from '@roots/bud-support/lodash/isFunction'
import Value from '@roots/bud-support/value'

import {Hooks} from '../base/base.js'

/**
 * Synchronous hooks registry
 */
export class SyncHooks extends Hooks<SyncStore> {
  /**
   * Get a value
   */
  @bind
  public get<T extends keyof SyncRegistry & string>(
    id: T,
    fallback?: SyncRegistry[T],
  ): SyncRegistry[T] {
    return [Value.make(fallback), ...(this.store[id] ?? [])]
      .map(Value.get)
      .reduce((accumulated, current) => {
        return isFunction(current) ? current(accumulated) : current
      })
  }

  /**
   * Set a value
   */
  @bind
  public set<T extends `${keyof SyncStore & string}`>(
    id: T,
    ...input: Array<SyncCallback[T]>
  ): Bud {
    if (!this.has(id)) this.store[id] = []
    this.store[id].push(...input.flatMap(Value.make))

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
}
