import type {Bud} from '@roots/bud-framework'
import type {Events, EventsStore} from '@roots/bud-framework/registry'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'

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

    for await (const action of this.store[id] as any) {
      this.logger.info(`running ${id}`)
      try {
        await action(...value)
        await this.app.resolvePromises()
      } catch (error) {
        this.logger.error(`problem running ${id} callback`)
        throw BudError.normalize(error)
      }
    }

    return this.app
  }

  @bind
  public set<T extends keyof EventsStore & string>(
    id: T,
    ...input: Array<(...value: Events[T]) => Promise<unknown>>
  ): Bud {
    if (!(id in this.store)) this.store[id] = []

    input.map(value => {
      this.logger.info(`registered ${id} callback`)
      this.store[id].push(value as any)
    })

    return this.app
  }
}
