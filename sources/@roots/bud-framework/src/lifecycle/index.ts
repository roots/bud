import {Bud, Config, Logger} from '..'
import * as methods from '../methods'
import {Module} from '../module'
import * as Process from '../process'
import {
  DEVELOPMENT_SERVICES,
  LIFECYCLE_EVENTS,
  PARENT_SERVICES,
} from './constants'

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
  this.options = {...options}

  this.module = new Module(this)

  this.children = {}

  Object.entries(methods).map(([key, method]) => {
    this[key] = method.bind(this)
  })

  if (!this.isRoot) Process.initialize(this)

  this.logger = new Logger(this)

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
