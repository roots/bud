import {isFunction, isUndefined} from 'lodash-es'

import type {Bud, Config} from '../index.js'
import type {Service} from '../service.js'
import * as args from './args.js'
import * as bootstrap from './bootstrap.js'
import {LIFECYCLE_EVENTS} from './constants.js'

/**
 * Lifecycle interface
 *
 * @public
 */
export interface lifecycle {
  (this: Bud, context: Partial<Config.Context>): Promise<Bud>
}

const getServiceInstances = (app: Bud) => (service: string) => app[service]

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
  context: Config.Context,
): Promise<Bud> {
  await bootstrap.execute(this, {...context})

  await LIFECYCLE_EVENTS.reduce(async (_promised, event) => {
    await Promise.all(
      this.services
        .map(getServiceInstances(this))
        .filter(getServiceFilterFn(event))
        .map(getServiceAsTupleMapperFn(event))
        .map(getServiceEventMapperFn(this, event)),
    )

    return Promise.resolve()
  }, Promise.resolve())

  this.services
    .map((service: string): Service => this[service])
    .filter(Boolean)
    .map(service => {
      !isUndefined(service.configAfter) &&
        this.hooks.action(`config.after`, service.configAfter) &&
        this.info(
          service.constructor.name,
          `configAfter method registered to hook`,
        )

      !isUndefined(service.buildBefore) &&
        this.hooks.action(`build.before`, service.buildBefore) &&
        this.info(
          service.constructor.name,
          `buildBefore method registered to hook`,
        )

      !isUndefined(service.buildAfter) &&
        this.hooks.action(`build.after`, service.buildAfter) &&
        this.info(
          service.constructor.name,
          `buildAfter method registered to hook`,
        )

      !isUndefined(service.compilerBefore) &&
        this.hooks.action(`compiler.before`, service.compilerBefore) &&
        this.info(
          service.constructor.name,
          `compilerBefore method registered to hook`,
        )

      !isUndefined(service.compilerAfter) &&
        this.hooks.action(`compiler.after`, service.compilerAfter) &&
        this.info(
          service.constructor.name,
          `compilerAfter method registered to hook`,
        )
    })

  this.hooks.action(`build.before`, args.buildBefore)

  return this
}
