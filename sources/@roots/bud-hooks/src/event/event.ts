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
    if (!this.has(id)) this.store[id] = []

    input.map(value => {
      this.store[id].push(value as any)
    })

    return this.app
  }

  @bind
  public async get<T extends keyof Events & string>(
    id: T,
    value: Events[T],
  ): Promise<Bud> {
    if (!this.has(id)) {
      this.app.hooks.logger.info(
        id,
        `was called but no hooks registered for this event`,
      )
      return this.app
    }

    this.app.hooks.logger.time(id)

    const actions = [...this.store[id]]

    await Promise.all(
      actions.map(async (action, iteration) => {
        try {
          await action(value as any)
        } catch (e) {
          e.name = `bud.hooks.event.get error: ${id}`
          e.message = [
            `There was an error while running a hook for the "${id}" event.`,
            `The error occurred in hook #${iteration}.`,
            `The error message was:`,
            e.message,
          ].join(`\n`)
          throw e
        }
      }),
    )

    this.app.hooks.logger.timeEnd(id)
    this.app.hooks.logger.info(id, this.store[id].length, `hooks fired`)

    return this.app
  }
}
