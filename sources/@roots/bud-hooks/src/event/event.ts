import type {Bud} from '@roots/bud-framework'
import type {Events, EventsStore} from '@roots/bud-framework/registry'

import {bind} from '@roots/bud-support/decorators/bind'

import {Hooks} from '../base/base.js'

/**
 * Synchronous hooks registry
 *
 * @remarks
 * Supports sync values
 */
export class EventHooks extends Hooks<EventsStore> {
  @bind
  public async get<T extends keyof Events & string>(
    id: T,
    ...value: Events[T]
  ): Promise<Bud> {
    if (!(id in this.store) || !this.store[id].length) return this.app

    this.app.hooks.logger.time(id)
    this.app.dashboard?.updateStatus(id)

    await Promise.all(
      this.store[id].map(async (action: any) => {
        await action(...value).catch((error: Error) => {
          throw error
        })
      }),
    ).catch(error => {
      throw error
    })

    return this.app
  }

  @bind
  public set<T extends keyof EventsStore & string>(
    id: T,
    ...input: Array<(...value: Events[T]) => Promise<unknown>>
  ): Bud {
    if (!(id in this.store)) this.store[id] = []

    input.map((value, iteration) => {
      this.app.hooks.logger.info(
        `registered ${id} callback`,
        `(${iteration + 1}/${input.length})`,
      )

      this.store[id].push(value as any)
    })

    return this.app
  }
}
