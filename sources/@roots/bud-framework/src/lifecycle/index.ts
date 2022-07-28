import {isFunction} from 'lodash-es'

import type {Bud, Config} from '../index.js'
import * as bootstrap from './bootstrap.js'
import {LIFECYCLE_EVENTS} from './constants.js'

/**
 * Lifecycle interface
 *
 * @public
 */
export interface lifecycle {
  (this: Bud, options: Config.Options): Promise<Bud>
}

const makeServiceEventMapper =
  (app: Bud, event: string) =>
  async ([ident, fn]) => {
    try {
      await fn(app)
      app.success(event, ident)
    } catch (err) {
      app.warn(`Error executing`, event, `for`, ident).error(err)
    }
  }

const makeServiceToTuple = (event: string) => service =>
  [service, service[event]]

const makeServiceEventFilter = (event: string) => service =>
  isFunction(service[event])

/**
 * Initializes and binds service lifecycle methods
 *
 * @example
 * ```js
 * new BudImplementation(...constructorParams).lifecycle()
 * ```
 *
 * @param this - {@link Bud}
 * @returns Bud
 *
 * @public
 */
export async function lifecycle(
  this: Bud,
  options: Config.Options,
): Promise<Bud> {
  bootstrap.execute(this, options)

  await LIFECYCLE_EVENTS.reduce(async (promised, event) => {
    if (promised) await promised

    await Promise.all(
      Object.values(this.services)
        .filter(makeServiceEventFilter(event))
        .map(makeServiceToTuple(event))
        .map(makeServiceEventMapper(this, event)),
    )
    return Promise.resolve()
  }, Promise.resolve())

  return this
}
