import type {Bud} from '@roots/bud-framework'
import type {Events, EventsStore} from '@roots/bud-framework/registry'
import {bind} from '@roots/bud-support/decorators'

import {Hooks} from '../base/base.js'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 */
export class EventHooks extends Hooks<EventsStore> {
  @bind
  public set<T extends keyof EventsStore & string>(
    id: T,
    ...input: Array<(value: Events[T]) => Promise<unknown>>
  ): Bud {
    if (!(id in this.store)) this.store[id] = []

    input.map((value, iteration) => {
      this.app.hooks.logger.info(
        `registered event callback for`,
        id,
        `(${iteration + 1}/${input.length})`,
      )

      this.store[id].push(value as any)
    })

    return this.app
  }

  @bind
  public async get<T extends keyof Events & string>(
    id: T,
    value: Events[T],
  ): Promise<Bud> {
    if (!(id in this.store) || !this.store[id].length) return this.app

    this.app.hooks.logger.time(id)

    const actions = [...this.store[id]]

    await Promise.all(
      actions.map(async (action, iteration) => {
        try {
          this.app.hooks.logger.await(
            `executing callback ${iteration + 1}/${actions.length}`,
          )
          await action(value as any)
          this.app.hooks.logger.success(
            `executing callback ${iteration + 1}/${actions.length}`,
          )
        } catch (e) {
          this.catch(e, id, iteration)
        }
      }),
    )
    this.app.hooks.logger.timeEnd(id)

    return this.app
  }
}
