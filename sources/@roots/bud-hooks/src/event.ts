import type {Bud} from '@roots/bud-framework'
import type {
  EventsCallback,
  EventsStore,
} from '@roots/bud-framework/registry'
import {bind} from '@roots/bud-support/decorators'

import {Hooks} from './base.js'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 *
 * @public
 */
export class EventHooks extends Hooks<EventsStore> {
  /**
   * Register a function to filter a value.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof EventsStore & string>(
    id: T,
    ...input: Array<EventsCallback>
  ): Bud {
    const value = input.map(this.app.value.make)
    if (this.store[id]) this.store[id] = [...this.store[id], ...value]
    else this.store[id] = value
    return this.app
  }

  /**
   * Fire actions registered to an event.
   *
   * @example
   * ```js
   * await app.hooks.fire('namespace.key')
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async get<T extends keyof EventsStore & string>(
    id: T,
  ): Promise<Bud> {
    if (!this.has(id)) return this.app

    await this.store[id]
      .map(this.app.value.get)
      .reduce(async (promise, action) => {
        await promise
        await action(this.app)
      }, Promise.resolve())

    this.store[id] = []

    return this.app
  }
}
