import {omit} from 'lodash-es'

import type {Bud, Config} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
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

  const initialized = Object.entries({...this.options.services})
    .filter(
      ([name]) =>
        this.isDevelopment || !DEVELOPMENT_SERVICES.includes(name),
    )
    .filter(([name]) => this.isRoot || !PARENT_SERVICES.includes(name))
    .map(([name, Service]) => {
      this.log('initializing', name)

      this[name] = new Service(this)

      return this[name]
    })

  await LIFECYCLE_EVENTS.reduce(async (promised, event) => {
    await promised

    await Promise.all(
      initialized
        .filter(service => service[event])
        .map(service => [service, service[event].bind(service)])
        .map(async ([service, callback]) => {
          try {
            await callback(this)
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
