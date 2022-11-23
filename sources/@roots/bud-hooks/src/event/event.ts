import type {Bud} from '@roots/bud-framework'
import type {
  EventsCallback,
  EventsStore,
} from '@roots/bud-framework/registry'
import type Value from '@roots/bud-framework/value'
import {bind} from '@roots/bud-support/decorators'

import {Hooks} from '../base/base.js'

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
    if (!this.has(id)) this.store[id] = []

    input
      .map(this.app.value.make)
      .map((value: Value<EventsCallback>) => this.store[id].push(value))

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

    const events = [...this.store[id]]
    this.store[id] = []

    await events
      .map(this.app.value.get)
      .reduce(async (promise, action) => {
        await promise
        await action(this.app)
      }, Promise.resolve())

    return this.app
  }
}
