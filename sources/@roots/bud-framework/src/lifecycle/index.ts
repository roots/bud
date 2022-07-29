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

const getServiceFilterFn = (event: string) => service =>
  isFunction(service[event])

const getServiceEventMapperFn =
  (app: Bud, event: string) =>
  async ([service, fn]) => {
    try {
      await fn(app)
      app.success(`${event}:`, service.constructor.name)
    } catch (err) {
      app.warn(`error executing`, event, `for`, service).error(err)
    }
  }

const getServiceAsTupleMapperFn = (event: string) => service =>
  [service, service[event]]

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

  await LIFECYCLE_EVENTS.reduce(async (_promised, event) => {
    await Promise.all(
      Object.values(this.services)
        .filter(getServiceFilterFn(event))
        .map(getServiceAsTupleMapperFn(event))
        .map(getServiceEventMapperFn(this, event)),
    )

    return Promise.resolve()
  }, Promise.resolve())

  return this
}
