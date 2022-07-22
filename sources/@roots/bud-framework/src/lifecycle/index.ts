import {isFunction, omit} from 'lodash-es'

import type {Bud, Config, Services} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import type {Service} from '../service.js'
import {
  DEVELOPMENT_SERVICES,
  LIFECYCLE_EVENTS,
  PARENT_SERVICES,
} from './constants.js'

/**
 * Bootstrap interface
 *
 * @public
 */
export interface lifecycle {
  (this: Bud, options: Config.Options): Promise<Bud>
}

/**
 * Initializes and binds {@link Bud.services}
 *
 * @example
 * ```js
 * new BudImplementation(...constructorParams).bootstrap()
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
  this.children = {}
  this.options = omit({...options}, 'context')
  this.context = {...options.context, dir: options.dir}

  process.env.NODE_ENV = options.mode

  Object.entries(methods).map(([key, method]) => {
    this[key] = method.bind(this)
  })

  if (!this.isRoot) Process.initialize(this)

  this.logger = new Logger(this)
  this.module = new Module(this)

  this.services = Object.entries({...options.services})
    .filter(
      ([name]) =>
        this.isDevelopment || !DEVELOPMENT_SERVICES.includes(name),
    )
    .filter(([name]) => this.isRoot || !PARENT_SERVICES.includes(name))
    .map(
      ([name, Service]): [keyof Services.Registry & string, Service] => {
        this.log('initializing', name)

        this[name] = new Service(this)

        return [name, this[name]]
      },
    )
    .reduce((a, [k, v]): Services.Registry => ({...a, [k]: v}), {})

  await LIFECYCLE_EVENTS.reduce(async (promised, event) => {
    await promised

    await Promise.all(
      Object.keys(this.services)
        .filter(service => isFunction(this[service][event]))
        .map(service => [
          service,
          this[service][event].bind(this[service]),
        ])
        .map(async ([service, serviceLifecycleMethod]) => {
          try {
            await serviceLifecycleMethod(this)

            this.success({
              message: event,
              suffix: service.constructor.name.toLowerCase(),
            })
          } catch (err) {
            this.error(
              `Error executing`,
              event,
              `for service`,
              service.constructor.name.toLowerCase(),
              `\n`,
              err,
            )
          }
        }),
    )

    return Promise.resolve()
  }, Promise.resolve())

  return this
}
